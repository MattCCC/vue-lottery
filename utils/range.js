export function range(startAt = 0, size) {
    return [ ...Array(size).keys() ].map(i => i + startAt)
}
