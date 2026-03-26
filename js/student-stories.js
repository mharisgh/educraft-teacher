(function () {
  // The list page only needs one render target and the shared card helpers.
  // If either is missing we exit quietly so the rest of the page can still load.
  var storiesContainer = document.getElementById("studentStoriesCards");
  var filterButtons = Array.from(document.querySelectorAll("[data-story-filter]"));
  if (!storiesContainer || !window.StudentStoryCards) return;

  var allStories = [];
  var activeFilter = {
    type: "all",
    value: "all"
  };

  function isUnpublishedStory(story) {
    return story.published === false && story.reviewStatus !== "rejected";
  }

  function matchesFilter(story) {
    if (activeFilter.type === "all") {
      return true;
    }

    if (activeFilter.type === "status") {
      if (activeFilter.value === "unpublished") {
        return isUnpublishedStory(story);
      }

      if (activeFilter.value === "rejected") {
        return story.reviewStatus === "rejected";
      }

      if (activeFilter.value === "editors-choice") {
        return story.isEditorsChoice === true;
      }

      return true;
    }

    if (activeFilter.type === "category") {
      return story.category === activeFilter.value;
    }

    return true;
  }

  function getFilteredStories() {
    return allStories.filter(function (story) {
      return matchesFilter(story);
    });
  }

  function setActiveButtonStyles() {
    filterButtons.forEach(function (button) {
      var isAll = button.getAttribute("data-story-filter") === "all";
      var isActive = isAll
        ? activeFilter.type === "all"
        : activeFilter.type === button.getAttribute("data-story-filter") &&
          activeFilter.value === button.getAttribute("data-filter-value");

      if (isActive) {
        button.classList.remove("border-black/10", "bg-white", "text-black");
        button.classList.add("bg-[#9c663b]", "text-white", "shadow-[0_12px_28px_rgba(248,116,11,0.22)]");
      } else {
        button.classList.remove("bg-[#9c663b]", "text-white", "shadow-[0_12px_28px_rgba(248,116,11,0.22)]");
        button.classList.add("border-black/10", "bg-white", "text-black");
      }
    });
  }

  function renderEmptyState() {
    storiesContainer.innerHTML =
      '<p class="col-span-full rounded-[24px] border border-dashed border-black/10 bg-[#fffaf4] px-6 py-10 text-center text-sm font-medium text-black/55">No stories match this filter right now.</p>';
  }

  function renderCards(stories) {
    storiesContainer.innerHTML = "";

    if (!stories.length) {
      renderEmptyState();
      return;
    }

    // The backend team controls the base order in JSON. We only pin
    // Editor's Choice stories to the front before rendering.
    window.StudentStoryCards.sortStories(stories).forEach(function (story, index) {
      var card = window.StudentStoryCards.createStoryCard(story, index);
      if (card) {
        storiesContainer.appendChild(card);
      }
    });
  }

  function renderActiveStories() {
    setActiveButtonStyles();
    renderCards(getFilteredStories());
  }

  function bindFilters() {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filterType = button.getAttribute("data-story-filter");
        var filterValue = button.getAttribute("data-filter-value") || "all";

        activeFilter = {
          type: filterType,
          value: filterValue
        };

        renderActiveStories();
      });
    });
  }

  // One shared data file keeps the card list and story detail pages in sync.
  // When a story is updated in JSON, both views automatically use the same data.
  fetch("./data/student-stories.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to load student stories data");
      }

      return response.json();
    })
    .then(function (data) {
      if (!data || !Array.isArray(data.stories)) {
        throw new Error("student-stories.json must contain a stories array");
      }

      allStories = data.stories
        .map(function (story) {
          return window.StudentStoryCards.applyStoryAdminState(story);
        })
        .filter(function (story) {
          return window.StudentStoryCards.isStoryVisible(story);
        });

      bindFilters();
      renderActiveStories();
    })
    .catch(function (error) {
      console.error(error);
      storiesContainer.innerHTML = '<p class="rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm text-black/60">Student stories could not be loaded right now.</p>';
    });
})();
