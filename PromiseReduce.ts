type arrayOfWrappedPromises = (() => Promise<Response>)[]

type cb = (lastResolvedPromise) => {}

type reducePromisesType = (
  arr: arrayOfWrappedPromises,
  cb?: cb
) => Promise<Response[]>

const reducePomises: reducePromisesType = async (arr, cb?) => {
  const response = await arr.reduce(async (acc, promise) => {
    const accum = await acc
    try {
      const resolvedPromise = await promise()
      accum.push(resolvedPromise)
    } catch (err) {
      accum.push(err)
    } finally {
      const lastResolvedPromise = accum[accum.length - 1]
      if (cb) cb(lastResolvedPromise)
    }

    return accum
  }, Promise.resolve<Response[]>([]))

  return response
}
