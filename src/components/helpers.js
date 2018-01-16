export function getFocusedElementId () {
  return document.activeElement.id
}

export function getFocusedTabIndex (tabs = []) {
  let activeId = getFocusedElementId()
  let tabIndex = tabs.findIndex(tab => tab.tabId === activeId)
  return tabIndex
}

export function findElementAndFocus (elemId) {
  let elem = document.getElementById(elemId)
  elem.focus()
}

export function isPromise (func) {
  return func.then && typeof func.then === 'function'
}

export const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result)))
  )

export const isPromiseLike = obj =>
  obj !== null &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function'
