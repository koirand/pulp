var fuse

/**
 * Preparation for searching
 */
function initSearch () {
  $.getJSON('index.json').done(function (index) {
    var options = {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      threshold: 0.3,
      minMatchCharLength: 5,
      keys: ['title', 'body']
    }
    fuse = new Fuse(index, options)
  }).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ', ' + error
    console.error('Error getting Hugo index flie:', err)
  })
}

/**
 * Setup UI for Search
 */
function initUI () {
  // Clear query when clear icon is clicked
  $('#searchBoxIcon').click(function () {
    $('#searchBox').val('')
    $('#searchBox').trigger('keyup')
  })

  // Event when chenging query
  $('#searchBox').keyup(function () {
    var $searchResults = $('#searchResults')
    var query = $(this).val().trim()

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
    renderResults(fuse.search(query))
    $searchResults.show()
  })

  // Emit keyup event for when the query is already setted with browser back etc.
  $('#searchBox').trigger('keyup')
}

/**
 * Rendering search results
 * @param {Object[]} results Array of search results
 */
function renderResults (results) {
  var $searchResults = $('#searchResults')
  var query = $('#searchBox').val()
  var SUMMARY_INCLUDE = 100
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
    var matchPosition = result.body.indexOf(query.split(' ')[0])
    var bodyStartPosition = matchPosition - SUMMARY_INCLUDE > 0 ? matchPosition - SUMMARY_INCLUDE : 0
    $searchResultPage.append('<a class="searchResultTitle" href="' + result.ref + '">' + result.title + '</a>')
    $searchResultPage.append('<div class="searchResultBody">' + result.body.substr(bodyStartPosition, SUMMARY_INCLUDE) + '</div>')
    $searchResults.append($searchResultPage)

    // Highlight keyword
    $('#searchResults').mark(query)
  })
}

initSearch()

$(function () {
  initUI()
})
