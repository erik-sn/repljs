import esprima from 'esprima';

export function getExpressions(code) {
  return esprima.parse(code, { loc: true }).body
                .filter(node => node.type === 'ExpressionStatement');
}

export function cleanCode(code, expressionLocations) {
  return code.split('\n').reduce((program, line, index) => {
    const compress = expressionLocations.some(({ start, end }) => (
      start !== end && index + 1 > start && index + 1 <= end
    ));
    // if we are compressing and there is no semicolon on the end of the line add one
    if (compress && line.indexOf(';') === -1) {
      line += ';';
    }
    return `${program}${compress ? '' : '\n'}${line}`;
  });
}

export function parseCode(code) {
  // check to make sure this is valid javascript - return error code if not
  try {
    eval(code);
  } catch (err) {
    return err.toString();
  }
  // find the start and stop point of all expressions
  const initialLocations = getExpressions(code).map(node => ({ start: node.loc.start.line, end: node.loc.end.line }));
  // clean the code into single line arguments to be iterated over
  const cleaned = cleanCode(code, initialLocations);
  // find all expressions in the cleaned code
  const finalLocations = getExpressions(cleaned).map(node => node.loc.start.line);

  // iterate over the cleaned code line by line, and execute the entire program
  // up to and including the current line, setting the result equal to the execution
  // result
  let result = '';
  cleaned.split('\n').reduce((program, line, index) => {
    const newProgram = program + '\n' + line;
    if (finalLocations.indexOf(index + 1) !== -1) {
      try { // try/catch this just in case
        result += JSON.stringify(eval(newProgram));
      } catch (err) {
        console.log(err)
      }
    }
    result += '\n';
    return newProgram;
  }, '');
  return result;
}