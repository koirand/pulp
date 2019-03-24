var lunrIndex
var lunrResult
var pagesIndex

/**
 * Preparation for using lunr.js
 */
function initLunr () {
  $.getJSON('index.json').done(function (index) {
    pagesIndex = index
    lunrIndex = lunr(function () {
      this.ref('ref')
      this.field('title', { boost: 10 })
      this.field('body')
      this.metadataWhitelist = ['position']
      for (var page of pagesIndex) {
        this.add(page)
      }
    })
  }).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ', ' + error
    console.error('Error getting Hugo index flie:', err)
  })
}

/**
 * Searching pages using lunr
 * @param {String} query Query string for searching
 * @return {Object[]} Array of search results
 */
function search (query) {
  lunrResult = lunrIndex.search(query)
  return lunrResult.map(function (result) {
    return pagesIndex.filter(function (page) {
      return page.ref === result.ref
    })[0]
  })
}

/**
 * Setup UI for Search
 */
function initUI () {
  // Clear query when clear icon is clicked
  $('#searchBoxIcon').click(function () {
    $('#searchBoxInput').val('')
    $('#searchBoxInput').trigger('keyup')
  })

  // Event when chenging query
  $('#searchBoxInput').keyup(function () {
    var $searchResults = $('#searchResults')
    var query = $(this).val()

    // Icon switching
    if (query.length) {
      $('#searchBoxIcon').attr('src', '/img/clear.png')
      $('#searchBoxIcon').css('cursor', 'pointer')
    } else {
      $('#searchBoxIcon').attr('src', '/img/search.png')
      $('#searchBoxIcon').css('cursor', 'default')
    }

    // Only trigger a search when 2 chars. at least have been provided
    if (query.length < 2) {
      $searchResults.hide()
      return
    }

    // Display search results
    renderResults(search(query))
    $searchResults.show()
  })

  // Emit keyup event for when the query is already setted with browser back etc.
  $('#searchBoxInput').trigger('keyup')
}

/**
 * Rendering search results
 * @param {Object[]} results Array of search results
 */
function renderResults (results) {
  var $searchResults = $('#searchResults')
  var query = $('#searchBoxInput').val()
  var BODY_LENGTH = 100
  var MAX_PAGES = 10

  // Clear search result
  $searchResults.empty()

  // Show message when results is empty
  if (!results.length) {
    $searchResults.append('<div class="searchResultPage">No results found for query "' + query + '"</div>')
    return
  }

  // Only show the ten first results
  results.slice(0, MAX_PAGES).forEach(function (result, idx) {
    var $searchResultPage = $('<div class="searchResultPage">')
    var metadata = lunrResult[idx].matchData.metadata
    var matchPosition = metadata[Object.keys(metadata)[0]].body ? metadata[Object.keys(metadata)[0]].body.position[0][0] : 0
    var bodyStartPosition = (matchPosition - (BODY_LENGTH / 2) > 0) ? matchPosition - (BODY_LENGTH / 2) : 0

    $searchResultPage.append('<a class="searchResultTitle" href="' + result.ref + '">' + result.title + '</a>')

    $searchResultPage.append('<div class="searchResultBody">' + result.body.substr(bodyStartPosition, BODY_LENGTH) + '</div>')
    $searchResults.append($searchResultPage)

    // Highlight keyword
    $('#searchResults').mark(query)
  })
}

initLunr()

$(function () {
  initUI()
})
