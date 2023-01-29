/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"ZBUgU0pVVt06djji","label":"school","bookmarks":[{"id":"i1wR6mFLXcJznG4p","label":"classroom","url":"https://classroom.google.com/u/0/"},{"id":"68DHKxqNU7Ty5lqv","label":"drive","url":"https://drive.google.com/drive/u/0/my-drive"},{"id":"aUc42vSqWgIJnSIB","label":"gmail","url":"https://mail.google.com/mail/u/0/"},{"id":"fYV2L7VohJEIy00M","label":"quill","url":"https://quillbot.com/"}]},{"id":"zhr3NVZ0Vbltw9Fm","label":"entertainment","bookmarks":[{"id":"EZzAoorNl5VbCnu4","label":"youtube","url":"https://www.youtube.com/"},{"id":"cvIgh9VmpKvKb9Ar","label":"netflix","url":"https://www.netflix.com/browse"},{"id":"a1BrwJflIErnLjK9","label":"anime","url":"https://9anime.to/home"},{"id":"9OjqXRKgc1D0O3du","label":"manga","url":"https://comick.app/home"}]},{"id":"2kQ1qRjWMzYKSAop","label":"other","bookmarks":[{"id":"6qZrdpwis8s685Ye","label":"grammarly","url":"https://stampyop.com/grammarly-premium-free/"},{"id":"dmAVCZJxsEZfSfO3","label":"books","url":"https://drive.google.com/drive/folders/1QQJppcibog3XeEY06SGHmUPXqVKmK6eN"},{"id":"gnfbt0hvudwOcp28","label":"bot","url":"https://chat.openai.com/chat"},{"id":"GKgQeHEyHmOSMO47","label":"speedtest","url":"https://www.speedtest.net/"}]},{"id":"yFXxsH0elt4OEi6L","label":"sources","bookmarks":[{"id":"BetPhGZBr9XlM8C0","label":"icons","url":"https://nhentai.net/"},{"id":"KDtUwCjzg64g876t","label":"gif","url":"https://www.pornhub.com/"},{"id":"VY6S9dSOD3GOe37F","label":"author","url":"https://prettycoffee.github.io/"},{"id":"1yUq51WDxSOHcANx","label":"startpage","url":"https://toonily.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
