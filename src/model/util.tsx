const argMax = (array) => {
  return [].reduce.call(array, (m, c, i, arr) => (c > arr[m] ? i : m), 0)
}

export default {
  argMax,
}
