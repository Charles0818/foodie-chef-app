export const quantifier = (qty, name) => {
  switch(qty) {
    case qty === 0:
      return 'No ${name}'
    case qty === 1:
      return `${qty} ${name}`;
    default:
      return `${qty} ${name}s`
    }

}