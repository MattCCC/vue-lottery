/**
 * Simple text formatted - replaces all %s by arguments
 * First Argument should be a string to replace
 * @autor Matt Czaplinski
 *
 * @return string     replaced text
 */
export function formatText() {
  return [ ...arguments ].reduce((acc, cur, index) => {
      return acc.replace(/%s/, cur)
    })
}
