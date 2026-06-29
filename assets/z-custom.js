
function collectionFilter(e){
  
  // Add / Remove class
  $('ul.type-filter__list').toggleClass('show_all')

  // 2. button text update (Show more -> Show less )
  let hasShowAllClass = $("ul.type-filter__list").hasClass("show_all");

  if (hasShowAllClass == true){
    // height is auto.
    // Change button text to 'Show less'
    $('#collection_filter_load_more').text('Show less');
    $('html,body').animate({scrollTop: 0}, 500); // Scroll to Top

  } else {
    // false, height is fixed, only show 2 lines
    // Change button text to 'Show more'
    $('#collection_filter_load_more').text('Show more');
    
  }

}


$(document).ready(function() {
  // Only on the collection page
  if (window.location.href.includes('collections')){
    checkFilterHeight();
  }
});


function checkFilterHeight(){
  console.log('checkFilterHeight');

  let filterNode = $('.type-filter__list')
  let filterNodeHeight = filterNode.height(); // 84 content height
  let listHeight = 30;
  let gap = 24;
  let twoLineHeight = (listHeight * 2) + gap; // 84

  console.log('checkFilterHeight', filterNode, filterNodeHeight);

  if (filterNode.length > 0){
    // filter node exist.
    if (filterNodeHeight > twoLineHeight){
      // keep button
      // Add class to the list
      filterNode.addClass('has_height')
      
    } else{
      // hide button
      $('.filter_list_wrap').hide()
    }
  }
}

function waitForElementToBePresent() {
  // Check if the element is present
  if ($('.rebuy-cart__progress-step-wrapper .rebuy-cart__progress-step:first-child .rebuy-cart__progress-step-label').length > 0) {
    // If the element is found, change the text
    $('.rebuy-cart__progress-step-wrapper .rebuy-cart__progress-step:first-child .rebuy-cart__progress-step-label').text('LOCS SUNGLASSES');
    $('.rebuy-cart__progress-free-product-title').text('FREE LOCS SUNGLASSES');
  } else {
    // If the element is not found, wait and check again after a delay
    setTimeout(waitForElementToBePresent, 100); // You can adjust the delay time (in milliseconds)
  }
}

// Start waiting for the element
waitForElementToBePresent();


// Add a click event to elements with the class .pills-variant-labels
$('.pills-variant-labels').on('click', function() {
  // Get the text content without the span inside
  const labelText = $(this).contents().filter(function() {
    return this.nodeType === 3; // Filter out non-text nodes (such as the span)
  }).text().trim();
  
  // Your code to handle the text content goes here
  console.log('Label Text:', labelText);

  $('.swatchProductColor').each(function() {
    var urlHandle = $(this).data('handle');
    newUrlHandle = urlHandle + '?size=' + labelText;
    console.log('urlHandle', newUrlHandle);
    $(this).attr('data-handle', newUrlHandle);
    localStorage.setItem('selectedSize', labelText);
  });
});

$(document).ready(function() {
  // Function to get the value of a query parameter
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Function to get the product identifier from the URL
  function getProductIdentifier() {
    const pathname = window.location.pathname;
    const parts = pathname.split('-');
    return parts[parts.length - 1];
  }

  // Function to store the selected size in local storage
  function storeSelectedSize(size) {
    localStorage.setItem('selectedSize', size);
  }

  // Function to retrieve the selected size from local storage
  function getSelectedSize() {
    return localStorage.getItem('selectedSize');
  }

  // Get the size query parameter value
  const sizeParam = getQueryParam('size');

  // Use the locally stored size if available
  const storedSize = getSelectedSize();

  if (storedSize) {
    // Loop over elements with the class .pills-variant-labels
    $('.pills-variant-labels').each(function() {
      // Get the text content without the span inside
      const labelText = $(this).contents().filter(function() {
        return this.nodeType === 3; // Filter out non-text nodes (such as the span)
      }).text().trim();

      // Check if the labelText matches the storedSize
      if (labelText === storedSize) {
        // Trigger a click on the matching element
        $(this).click();
        return false; // Exit the loop once a match is found
      }
    });
  } else if (sizeParam) {
    // Use the sizeParam if locally stored size is not available
    // Loop over elements with the class .pills-variant-labels
    $('.pills-variant-labels').each(function() {
      // Get the text content without the span inside
      const labelText = $(this).contents().filter(function() {
        return this.nodeType === 3; // Filter out non-text nodes (such as the span)
      }).text().trim();

      // Check if the labelText matches the sizeParam
      if (labelText === sizeParam) {
        // Trigger a click on the matching element
        $(this).click();
        return false; // Exit the loop once a match is found
      }
    });

    // Store the selected size in local storage
    storeSelectedSize(sizeParam);
  }

  // Check for URL changes
  $(window).on('popstate', function() {
    const currentProductIdentifier = getProductIdentifier();
    const previousSize = getSelectedSize();

    // Check if the product identifier is the same and a size was previously selected
    if (currentProductIdentifier === getProductIdentifier() && previousSize) {
      console.log('Previously selected size:', previousSize);
    }
  });
});


console.log('previousSize', localStorage.selectedSize);


document.addEventListener("DOMContentLoaded", function() {
    // Select all product cards with the specified class
    const productCards = document.querySelectorAll('.collection-product-card.quickview--hover');

    // Add event listeners for hover
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const video = card.querySelector('.media video');
            if (video) {
                video.play();
            }
        });

        card.addEventListener('mouseleave', function() {
            const video = card.querySelector('.media video');
            if (video) {
                video.pause();
                video.currentTime = 0; // Optional: reset the video to start
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
          console.log('testjkj');

  setTimeout(() => {
                   // Select all video elements
    const videos = document.querySelectorAll('video');

    // Change preload attribute to auto for all video elements
    videos.forEach(video => {
        console.log('video', video)
        video.setAttribute('preload', 'auto');
        video.load(); // This will trigger the loading process
    });
                        }, 2000); // 2000 milliseconds = 2 seconds

    
  
    // Select all subitems
    const subitems = document.querySelectorAll('.product__media-sublist .product__media-subitem');

    // Add click event listener to each subitem
    subitems.forEach(subitem => {
        subitem.addEventListener('click', function() {
            // Loop over all media items
            const mediaItems = document.querySelectorAll('.product__media-list .product__media-item');

            mediaItems.forEach(mediaItem => {
                // Check if the media item has the class .swiper-slide-active
                if (mediaItem.classList.contains('swiper-slide-active')) {
                    // Find the .deferred-media__poster inside the active media item
                    const poster = mediaItem.querySelector('.deferred-media__poster');
                    
                    // Trigger a click on the .deferred-media__poster after a 2-second delay if it exists
                    if (poster) {
                        setTimeout(() => {
                            poster.click();
                        }, 500); // 2000 milliseconds = 2 seconds
                    }
                }
            });
        });
    });
});








