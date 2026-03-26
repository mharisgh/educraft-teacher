(function () {
  var root = document.getElementById("storyDetailRoot");
  var editLink = document.getElementById("storyEditLink");
  var actionsToggle = document.getElementById("storyActionsToggle");
  var actionsMenu = document.getElementById("storyActionsMenu");
  var publishButton = document.getElementById("storyPublishButton");
  var rejectButton = document.getElementById("storyRejectButton");
  var deleteButton = document.getElementById("storyDeleteButton");
  var editorsChoiceButton = document.getElementById("storyEditorsChoiceButton");
  var actionDialog = document.getElementById("storyActionDialog");
  var actionDialogTitle = document.getElementById("storyActionDialogTitle");
  var actionDialogBody = document.getElementById("storyActionDialogBody");
  var actionDialogClose = document.getElementById("storyActionDialogClose");
  var actionDialogCancel = document.getElementById("storyActionDialogCancel");
  var actionDialogConfirm = document.getElementById("storyActionDialogConfirm");
  var actionDialogReasonWrap = document.getElementById("storyActionDialogReasonWrap");
  var actionDialogReason = document.getElementById("storyActionDialogReason");
  var actionDialogReasonHelp = document.getElementById("storyActionDialogReasonHelp");
  var actionDialogState = {
    onConfirm: null,
    requiresReason: false
  };
  if (!root || !window.StudentStoryCards) return;

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(value) {
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return value || "";

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function getCurrentStoryId() {
    var params = new URLSearchParams(window.location.search);
    return params.get("story");
  }

  function getStoryById(stories, id) {
    if (!id) return stories[0] || null;
    return stories.find(function (story) {
      return story.id === id;
    }) || null;
  }

  function getRelatedStories(stories, currentStory) {
    // Related stories can be curated in JSON with relatedStoryIds.
    // If that list is short, we fill the rest from the same category first.
    var lookup = Object.create(null);
    stories.forEach(function (story) {
      lookup[story.id] = story;
    });

    var explicit = (currentStory.relatedStoryIds || [])
      .map(function (storyId) {
        return lookup[storyId];
      })
      .filter(Boolean)
      .filter(function (story) {
        return story.id !== currentStory.id;
      });

    if (explicit.length >= 4) {
      return explicit.slice(0, 4);
    }

    var seen = Object.create(null);
    explicit.forEach(function (story) {
      seen[story.id] = true;
    });

    var sameCategory = stories.filter(function (story) {
      return (
        story.id !== currentStory.id &&
        story.category === currentStory.category &&
        !seen[story.id]
      );
    });

    sameCategory.forEach(function (story) {
      seen[story.id] = true;
      explicit.push(story);
    });

    var fallback = window.StudentStoryCards.sortStories(stories).filter(function (story) {
      return story.id !== currentStory.id && !seen[story.id];
    });

    fallback.forEach(function (story) {
      explicit.push(story);
    });

    return explicit.slice(0, 4);
  }

  function createReactionButton(label, count, svg, borderColor, backgroundColor, countSuffix) {
    return (
      '<button type="button" data-reaction-button data-active-border="' + borderColor + '" data-active-bg="' + backgroundColor + '" class="story-reaction-button inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-5 py-4 text-left transition duration-200 hover:bg-white">' +
        svg +
        '<span>' +
          '<span class="block text-sm font-semibold text-black">' + escapeHtml(label) + '</span>' +
          '<span class="mt-1 block text-xs text-black/55"><span data-reaction-count>' + escapeHtml(count) + '</span> ' + escapeHtml(countSuffix) + '</span>' +
        '</span>' +
      '</button>'
    );
  }

  function formatPublishedLabel(story) {
    return story && story.published === false ? "--" : formatDate(story.publishedDate);
  }

  function closeActionsMenu() {
    if (!actionsMenu || !actionsToggle) return;

    actionsMenu.classList.add("hidden");
    actionsToggle.setAttribute("aria-expanded", "false");
    var arrow = actionsToggle.querySelector("svg");
    if (arrow) {
      arrow.classList.remove("rotate-180");
    }
  }

  function openActionsMenu() {
    if (!actionsMenu || !actionsToggle) return;

    actionsMenu.classList.remove("hidden");
    actionsToggle.setAttribute("aria-expanded", "true");
    var arrow = actionsToggle.querySelector("svg");
    if (arrow) {
      arrow.classList.add("rotate-180");
    }
  }

  function initActionsMenu() {
    if (!actionsToggle || !actionsMenu || actionsToggle.dataset.bound === "true") {
      return;
    }

    actionsToggle.dataset.bound = "true";
    actionsToggle.addEventListener("click", function (event) {
      event.stopPropagation();

      if (actionsMenu.classList.contains("hidden")) {
        openActionsMenu();
      } else {
        closeActionsMenu();
      }
    });

    actionsMenu.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    document.addEventListener("click", function () {
      closeActionsMenu();
    });
  }

  function closeActionDialog() {
    if (!actionDialog) return;

    actionDialog.classList.add("hidden");
    actionDialog.classList.remove("flex");
    actionDialogState.onConfirm = null;
    actionDialogState.requiresReason = false;

    if (actionDialogReasonWrap) {
      actionDialogReasonWrap.classList.add("hidden");
    }

    if (actionDialogReason) {
      actionDialogReason.value = "";
    }

    if (actionDialogReasonHelp) {
      actionDialogReasonHelp.classList.add("hidden");
    }
  }

  function openActionDialog(config) {
    if (!actionDialog || !actionDialogTitle || !actionDialogBody || !actionDialogConfirm) {
      return;
    }

    actionDialogState.onConfirm = typeof config.onConfirm === "function" ? config.onConfirm : null;
    actionDialogState.requiresReason = !!config.requiresReason;

    actionDialogTitle.textContent = config.title || "Confirm Action";
    actionDialogBody.textContent = config.body || "Please confirm this action.";
    actionDialogConfirm.textContent = config.confirmLabel || "Confirm";
    actionDialogConfirm.className =
      "inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-white transition " +
      (config.confirmTone || "bg-black hover:bg-black/90");

    if (actionDialogReasonWrap) {
      actionDialogReasonWrap.classList.toggle("hidden", !config.requiresReason);
    }

    if (actionDialogReason) {
      actionDialogReason.value = "";
      actionDialogReason.placeholder = config.reasonPlaceholder || "Write a short note.";
    }

    if (actionDialogReasonHelp) {
      actionDialogReasonHelp.classList.add("hidden");
    }

    actionDialog.classList.remove("hidden");
    actionDialog.classList.add("flex");

    if (config.requiresReason && actionDialogReason) {
      actionDialogReason.focus();
    } else {
      actionDialogConfirm.focus();
    }
  }

  function initActionDialog() {
    if (!actionDialog || actionDialog.dataset.bound === "true") {
      return;
    }

    actionDialog.dataset.bound = "true";

    function handleClose() {
      closeActionDialog();
    }

    if (actionDialogClose) {
      actionDialogClose.addEventListener("click", handleClose);
    }

    if (actionDialogCancel) {
      actionDialogCancel.addEventListener("click", handleClose);
    }

    if (actionDialog) {
      actionDialog.addEventListener("click", function (event) {
        if (event.target === actionDialog) {
          handleClose();
        }
      });
    }

    if (actionDialogConfirm) {
      actionDialogConfirm.addEventListener("click", function () {
        var reason = actionDialogReason ? actionDialogReason.value.trim() : "";
        if (actionDialogState.requiresReason && !reason) {
          if (actionDialogReasonHelp) {
            actionDialogReasonHelp.classList.remove("hidden");
          }
          if (actionDialogReason) {
            actionDialogReason.focus();
          }
          return;
        }

        var confirmHandler = actionDialogState.onConfirm;
        closeActionDialog();
        if (confirmHandler) {
          confirmHandler(reason);
        }
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && actionDialog && !actionDialog.classList.contains("hidden")) {
        closeActionDialog();
      }
    });
  }

  function syncStoryInCollection(stories, nextStory) {
    return stories
      .map(function (story) {
        return story.id === nextStory.id ? nextStory : story;
      })
      .filter(function (story) {
        return window.StudentStoryCards.isStoryVisible(story);
      });
  }

  function buildStoryTemplate(story) {
    // The detail layout is fixed. Each new story only needs data in JSON,
    // which makes the page much easier to scale past 100 stories.
    var reactionTotal = window.StudentStoryCards.getAppreciationCount(story);
    var visibleReactions = window.StudentStoryCards.getStoryReactionCounts(story);
    var toolsHtml = (story.toolsUsed || []).map(function (tool) {
      return '<span class="rounded-full border border-[#f8740b] px-4 py-2 text-sm font-medium text-[#bf4b00]">' + escapeHtml(tool) + '</span>';
    }).join("");

    var imagesHtml = (story.buildImages || []).map(function (imageSrc, index) {
      return '<img src="' + escapeHtml(imageSrc) + '" alt="' + escapeHtml(story.title + ' image ' + (index + 1)) + '" class="h-56 w-full rounded-[24px] object-cover" />';
    }).join("");

    return (
      '<section class="overflow-hidden rounded-3xl bg-white">' +
        '<div class="relative h-[280px] overflow-hidden sm:h-[360px] lg:h-[420px]">' +
          '<img src="' + escapeHtml(story.coverImg) + '" alt="' + escapeHtml(story.title) + '" class="h-full w-full object-cover" />' +
          '<div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10"></div>' +
          '<div class="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">' +
            '<p class="text-sm font-medium text-white/75">Student Story . ' + escapeHtml(story.readTime) + '</p>' +
            '<h1 class="mt-3 max-w-4xl text-2xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">' + escapeHtml(story.title) + '</h1>' +
            '<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">' +
              '<div class="mt-5 flex flex-wrap items-center gap-3 text-white/85">' +
                '<img src="' + escapeHtml(story.authorImg) + '" alt="' + escapeHtml(story.authorName) + '" class="h-12 w-12 rounded-full border border-white/30 object-cover" />' +
                '<div>' +
                  '<p class="text-sm text-white/70">Created by</p>' +
                  '<p class="font-semibold">' + escapeHtml(story.authorName) + ' . ' + escapeHtml(story.authorGrade) + '</p>' +
                '</div>' +
              '</div>' +
              '<div class="mt-5 flex items-center gap-6 rounded-2xl bg-black/20 px-4 py-3 text-white backdrop-blur-sm">' +
                '<div>' +
                  '<p class="text-xs uppercase tracking-[0.2em] text-white/60">Category</p>' +
                  '<p class="mt-1 font-semibold text-white">' + escapeHtml(story.category) + '</p>' +
                '</div>' +
                '<div class="h-10 w-px bg-white/20"></div>' +
                '<div>' +
                  '<p class="text-xs uppercase tracking-[0.2em] text-white/60">Published</p>' +
                  '<p class="mt-1 font-semibold text-white">' + escapeHtml(formatPublishedLabel(story)) + '</p>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="py-8 lg:py-10">' +
          '<section>' +
            '<h2 class="text-2xl font-semibold text-black">Key Summary</h2>' +
            '<p class="mt-4 font-medium text-base leading-8 sm:text-lg">' + escapeHtml(story.keySummary) + '</p>' +
          '</section>' +

          '<section class="mt-10">' +
            '<h2 class="text-2xl font-semibold text-black">The Idea</h2>' +
            '<p class="mt-4 text-base leading-8 text-black/75 sm:text-lg">' + escapeHtml(story.idea) + '</p>' +
          '</section>' +

          '<section class="mt-10">' +
            '<h2 class="text-2xl font-semibold text-black">What I Built</h2>' +
            '<p class="mt-4 text-base leading-8 text-black/75 sm:text-lg">' + escapeHtml(story.whatIBuilt) + '</p>' +
            '<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">' + imagesHtml + '</div>' +
            '<div class="mt-6 flex flex-wrap gap-3">' + toolsHtml + '</div>' +
          '</section>' +

          '<section class="mt-10">' +
            '<h2 class="text-2xl font-semibold text-black">What I Learned</h2>' +
            '<p class="mt-4 text-base leading-8 text-black/75 sm:text-lg">' + escapeHtml(story.whatILearned) + '</p>' +
          '</section>' +

          '<section class="mt-10 rounded-[28px] border border-[#f2d8c4] bg-gradient-to-r from-[#fff5ec] to-[#ffe9d7] p-6 sm:p-8">' +
            '<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">' +
              '<div class="flex items-center gap-4">' +
                '<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f8740b] text-white shadow-[0_12px_24px_rgba(248,116,11,0.24)]">' +
                  '<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path><path d="M18 20v-1a4 4 0 0 0-4-4H10a4 4 0 0 0-4 4v1"></path><path d="M19 8v4"></path><path d="M17 10h4"></path></svg>' +
                '</div>' +
                '<h2 class="font-semibold text-black text-base">Teacher\'s Note</h2>' +
              '</div>' +
              '<button type="button" data-teacher-note-edit class="inline-flex w-fit rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-semibold text-black/70 transition hover:border-black/20 hover:bg-white hover:text-black">Edit Note</button>' +
            '</div>' +
            '<div class="mt-5">' +
              '<p data-teacher-note-display class="text-lg leading-9 text-black/75">' + escapeHtml(story.teacherNote) + '</p>' +
              '<div data-teacher-note-editor class="hidden">' +
                '<textarea data-teacher-note-input rows="5" class="min-h-[180px] w-full rounded-[24px] border border-[#edc9ae] bg-white/90 px-5 py-4 text-base leading-8 text-black/80 outline-none transition focus:border-[#f8740b]"></textarea>' +
                '<div class="mt-4 flex flex-wrap items-center gap-3">' +
                  '<button type="button" data-teacher-note-save class="inline-flex rounded-full bg-[#f8740b] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#bf4b00]">Save Note</button>' +
                  '<button type="button" data-teacher-note-cancel class="inline-flex rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-semibold text-black/65 transition hover:border-black/20 hover:text-black">Cancel</button>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</section>' +

          '<section class="mt-10 rounded-[28px] border border-black/10 bg-[#fffaf4] p-6 sm:p-8">' +
            '<div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">' +
              '<div>' +
                '<h2 class="text-2xl font-semibold text-black">Did you enjoy this story?</h2>' +
                '<p class="mt-3 max-w-2xl text-base leading-7 text-black/70">Let the author know how the story made you feel. A little appreciation goes a long way and makes students feel proud of their work.</p>' +
              '</div>' +
              '<p class="text-sm font-medium text-[#bf4b00]">Reader appreciation</p>' +
            '</div>' +
            '<div class="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">' +
              createReactionButton('Like', visibleReactions.like, '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="#4c8dff" viewBox="0 0 256 256" aria-hidden="true"><path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32Z"></path></svg>', '#4c8dff', '#f5f9ff', 'likes') +
              createReactionButton('Clap', visibleReactions.clap, '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="#f8740b" viewBox="0 0 256 256" aria-hidden="true"><path d="M188.87,65A18,18,0,0,0,157.62,83L133.36,41a18,18,0,0,0-31.22,18L96.4,49A18,18,0,0,0,65.18,67l3.34,5.77A26,26,0,0,0,39.74,111l3,5.2A26,26,0,0,0,23.5,155l35.27,61a80.14,80.14,0,0,0,149.52-39.57A71.92,71.92,0,0,0,210,101.58Zm1.2,127.56A64.12,64.12,0,0,1,72.65,208L37.38,147a10,10,0,0,1,17.34-10L75,172a8,8,0,0,0,13.87-8L53.62,103A10,10,0,0,1,71,93l31.81,55a8,8,0,0,0,13.87-8l-26-45a10,10,0,0,1,17.35-10l36.5,63a8,8,0,0,0,13.87-8l-12.6-21.75A10,10,0,0,1,163.44,109l20.22,35A63.52,63.52,0,0,1,190.07,192.57ZM160.22,24V8a8,8,0,0,1,16,0V24a8,8,0,0,1-16,0Zm33.22,6,8-13.1a8,8,0,0,1,13.68,8.33l-8,13.11a8,8,0,0,1-6.84,3.83A8,8,0,0,1,193.44,30Zm45,33.66-15.05,4.85a8.15,8.15,0,0,1-2.46.39,8,8,0,0,1-2.46-15.62l15.06-4.85a8,8,0,1,1,4.91,15.23Z"></path></svg>', '#f8740b', '#fff3e8', 'claps') +
              createReactionButton('Inspired', visibleReactions.inspired, '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="#ffbc00" viewBox="0 0 256 256" aria-hidden="true"><path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"></path></svg>', '#ffbc00', '#fff9eb', 'ideas sparked') +
            '</div>' +
            '<div class="mt-5 flex items-center gap-3">' +
              '<div class="flex -space-x-2">' +
                '<span class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#eff6ff] shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="#4c8dff" viewBox="0 0 256 256" aria-hidden="true"><path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32Z"></path></svg></span>' +
                '<span class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#fff3e8] shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="#f8740b" viewBox="0 0 256 256" aria-hidden="true"><path d="M188.87,65A18,18,0,0,0,157.62,83L133.36,41a18,18,0,0,0-31.22,18L96.4,49A18,18,0,0,0,65.18,67l3.34,5.77A26,26,0,0,0,39.74,111l3,5.2A26,26,0,0,0,23.5,155l35.27,61a80.14,80.14,0,0,0,149.52-39.57A71.92,71.92,0,0,0,210,101.58Zm1.2,127.56A64.12,64.12,0,0,1,72.65,208L37.38,147a10,10,0,0,1,17.34-10L75,172a8,8,0,0,0,13.87-8L53.62,103A10,10,0,0,1,71,93l31.81,55a8,8,0,0,0,13.87-8l-26-45a10,10,0,0,1,17.35-10l36.5,63a8,8,0,0,0,13.87-8l-12.6-21.75A10,10,0,0,1,163.44,109l20.22,35A63.52,63.52,0,0,1,190.07,192.57ZM160.22,24V8a8,8,0,0,1,16,0V24a8,8,0,0,1-16,0Zm33.22,6,8-13.1a8,8,0,0,1,13.68,8.33l-8,13.11a8,8,0,0,1-6.84,3.83A8,8,0,0,1,193.44,30Zm45,33.66-15.05,4.85a8.15,8.15,0,0,1-2.46.39,8,8,0,0,1-2.46-15.62l15.06-4.85a8,8,0,1,1,4.91,15.23Z"></path></svg></span>' +
                '<span class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#fff9eb] shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="#ffbc00" viewBox="0 0 256 256" aria-hidden="true"><path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"></path></svg></span>' +
              '</div>' +
              '<div class="flex items-center gap-2 text-sm font-medium text-black/65">' +
                '<span data-reaction-total>' + escapeHtml(reactionTotal) + '</span>' +
                '<span>appreciations</span>' +
              '</div>' +
            '</div>' +
          '</section>' +

          '<section class="mt-12">' +
            '<div class="flex items-end justify-between gap-4">' +
              '<div>' +
                '<h2 class="text-2xl font-semibold text-black sm:text-4xl">More Stories to Read</h2>' +
                '<p class="mt-3 text-lg text-black/60">Discover more inspiring projects from our students</p>' +
              '</div>' +
            '</div>' +
            '<div id="relatedStoriesGrid" class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4"></div>' +
          '</section>' +

          '<section class="mt-10 rounded-[28px] border border-[#f2d8c4] bg-[#fff4ea] p-6 sm:p-8">' +
            '<h2 class="text-2xl font-semibold text-black">Share your project too</h2>' +
            '<p class="mt-3 max-w-2xl text-base leading-7 text-black/70">Have a project, prototype, or creative idea you want to show? Use the simple story submission form and we can turn it into a story card next.</p>' +
            '<a href="./submit-story.html" class="mt-5 inline-flex rounded-full bg-[#f8740b] px-6 py-3 font-semibold text-white transition hover:bg-[#bf4b00]">Submit Your Story</a>' +
          '</section>' +
        '</div>' +
      '</section>'
    );
  }

  function initStoryActions(stories, story) {
    initActionsMenu();
    initActionDialog();

    if (editLink) {
      editLink.href = "./submit-story.html?story=" + encodeURIComponent(story.id);
    }

    if (publishButton) {
      publishButton.textContent = story.published === false ? "Publish" : "Unpublish";
      publishButton.className =
        "flex w-full items-center rounded-2xl px-4 py-3 text-sm font-medium transition " +
        (story.published === false
          ? "text-[#236b43] hover:bg-[#edf9f1]"
          : "text-[#b96510] hover:bg-[#fff4e7]");
    }

    if (editorsChoiceButton) {
      editorsChoiceButton.textContent = story.isEditorsChoice ? "Remove Editor's Choice" : "Mark as Editor's Choice";
    }

    if (publishButton) {
      publishButton.onclick = function () {
        closeActionsMenu();
        openActionDialog({
          title: story.published === false ? "Publish Story?" : "Unpublish Story?",
          body: story.published === false
            ? "Are you going to publish this story so every student can read it?"
            : "Are you going to hide or unpublish this story? Students will no longer be able to read it until you publish it again.",
          confirmLabel: story.published === false ? "Publish" : "Unpublish",
          confirmTone: story.published === false ? "bg-[#236b43] hover:bg-[#1c5536]" : "bg-[#b96510] hover:bg-[#8f4e0c]",
          onConfirm: function () {
            var updatedStory = window.StudentStoryCards.updateStoryAdminState(
              story.id,
              {
                published: story.published === false,
                reviewStatus: story.published === false ? "published" : "unpublished",
                deleted: false,
                rejectionReason: story.published === false ? "" : (story.rejectionReason || "")
              },
              story
            );
            renderStory(syncStoryInCollection(stories, updatedStory), updatedStory);
          }
        });
      };
    }

    if (rejectButton) {
      rejectButton.onclick = function () {
        closeActionsMenu();
        openActionDialog({
          title: "Reject Story?",
          body: "Are you going to reject this story? The student will get an email with your reason so they can improve it and upload again.",
          confirmLabel: "Reject Story",
          confirmTone: "bg-[#c14032] hover:bg-[#9f3126]",
          requiresReason: true,
          reasonPlaceholder: "Write the rejection reason that will go in the student email.",
          onConfirm: function (reason) {
            var updatedStory = window.StudentStoryCards.updateStoryAdminState(
              story.id,
              {
                published: false,
                reviewStatus: "rejected",
                deleted: false,
                isEditorsChoice: false,
                rejectionReason: reason
              },
              story
            );
            renderStory(syncStoryInCollection(stories, updatedStory), updatedStory);
          }
        });
      };
    }

    if (deleteButton) {
      deleteButton.onclick = function () {
        closeActionsMenu();
        openActionDialog({
          title: "Delete Story?",
          body: "Are you sure you want to delete this story permanently? This action cannot be undone. ",
          confirmLabel: "Delete Story",
          confirmTone: "bg-[#9a1f16] hover:bg-[#78180f]",
          onConfirm: function () {
            window.console.info("Delete story confirmed for backend handling:", story.id);
          }
        });
      };
    }

    if (editorsChoiceButton) {
      editorsChoiceButton.onclick = function () {
        closeActionsMenu();
        openActionDialog({
          title: story.isEditorsChoice ? "Remove Editor's Choice?" : "Mark as Editor's Choice?",
          body: story.isEditorsChoice
            ? "Are you sure you want to remove this story from Editor's Choice?"
            : "Are you sure you want to mark this story as Editor's Choice? The student will get an email letting them know it was selected.",
          confirmLabel: story.isEditorsChoice ? "Remove Choice" : "Mark as Choice",
          confirmTone: story.isEditorsChoice ? "bg-[#9b7000] hover:bg-[#7a5800]" : "bg-[#c99b00] hover:bg-[#a78000]",
          onConfirm: function () {
            var updatedStory = window.StudentStoryCards.updateStoryAdminState(
              story.id,
              {
                isEditorsChoice: !story.isEditorsChoice
              },
              story
            );
            renderStory(syncStoryInCollection(stories, updatedStory), updatedStory);
          }
        });
      };
    }
  }

  function initTeacherNoteEditor(story) {
    var editButton = root.querySelector("[data-teacher-note-edit]");
    var noteDisplay = root.querySelector("[data-teacher-note-display]");
    var noteEditor = root.querySelector("[data-teacher-note-editor]");
    var noteInput = root.querySelector("[data-teacher-note-input]");
    var saveButton = root.querySelector("[data-teacher-note-save]");
    var cancelButton = root.querySelector("[data-teacher-note-cancel]");

    if (!editButton || !noteDisplay || !noteEditor || !noteInput || !saveButton || !cancelButton) {
      return;
    }

    var currentNote = story.teacherNote || "";
    noteDisplay.textContent = currentNote;
    noteInput.value = currentNote;

    function setEditing(isEditing) {
      noteDisplay.classList.toggle("hidden", isEditing);
      noteEditor.classList.toggle("hidden", !isEditing);
      editButton.classList.toggle("hidden", isEditing);

      if (isEditing) {
        noteInput.focus();
        noteInput.setSelectionRange(noteInput.value.length, noteInput.value.length);
      }
    }

    editButton.addEventListener("click", function () {
      noteInput.value = currentNote;
      setEditing(true);
    });

    cancelButton.addEventListener("click", function () {
      noteInput.value = currentNote;
      setEditing(false);
    });

    saveButton.addEventListener("click", function () {
      var nextNote = noteInput.value.trim();
      if (!nextNote) {
        noteInput.focus();
        return;
      }

      currentNote = nextNote;
      story.teacherNote = nextNote;
      noteDisplay.textContent = nextNote;
      window.StudentStoryCards.updateStoryAdminState(
        story.id,
        {
          teacherNote: nextNote
        },
        story
      );
      setEditing(false);
    });
  }

  function initReactionButtons(container) {
    // Only one appreciation can be active at a time, similar to social apps.
    // Clicking the active reaction again removes it and restores the base counts.
    var reactionButtons = Array.from(container.querySelectorAll("[data-reaction-button]"));
    var totalEl = container.querySelector("[data-reaction-total]");
    if (!reactionButtons.length) return;

    reactionButtons.forEach(function (button) {
      var countEl = button.querySelector("[data-reaction-count]");
      if (!countEl) return;

      button.dataset.baseCount = String(parseInt(countEl.textContent, 10) || 0);
      button.dataset.active = "false";
    });

    function updateTotal() {
      if (!totalEl) return;

      var total = reactionButtons.reduce(function (sum, button) {
        var countEl = button.querySelector("[data-reaction-count]");
        return sum + (parseInt(countEl ? countEl.textContent : "0", 10) || 0);
      }, 0);

      totalEl.textContent = String(total);
    }

    function resetButton(button) {
      var countEl = button.querySelector("[data-reaction-count]");
      if (!countEl) return;

      countEl.textContent = button.dataset.baseCount || "0";
      button.dataset.active = "false";
      button.style.borderColor = "";
      button.style.backgroundColor = "";
      button.style.boxShadow = "";
      button.classList.remove("scale-[1.03]", "shadow-[0_16px_30px_rgba(15,23,42,0.08)]");
    }

    function activateButton(button) {
      var countEl = button.querySelector("[data-reaction-count]");
      if (!countEl) return;

      var activeBorder = button.dataset.activeBorder || "#f8740b";
      var activeBg = button.dataset.activeBg || "#fff3e8";
      var baseCount = parseInt(button.dataset.baseCount || "0", 10);

      button.dataset.active = "true";
      countEl.textContent = String(baseCount + 1);
      button.style.borderColor = activeBorder;
      button.style.backgroundColor = activeBg;
      button.style.boxShadow = "0 16px 30px rgba(15, 23, 42, 0.08)";
      button.classList.remove("scale-[1.03]", "shadow-[0_16px_30px_rgba(15,23,42,0.08)]");
      void button.offsetWidth;
      button.classList.add("scale-[1.03]", "shadow-[0_16px_30px_rgba(15,23,42,0.08)]");

      window.setTimeout(function () {
        button.classList.remove("scale-[1.03]");
      }, 180);
    }

    reactionButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var isActive = button.dataset.active === "true";

        if (isActive) {
          resetButton(button);
          updateTotal();
          return;
        }

        reactionButtons.forEach(function (otherButton) {
          if (otherButton !== button) {
            resetButton(otherButton);
          }
        });

        activateButton(button);
        updateTotal();
      });
    });

    updateTotal();
  }

  function renderRelatedStories(stories, currentStory) {
    var relatedContainer = root.querySelector("#relatedStoriesGrid");
    if (!relatedContainer) return;

    getRelatedStories(stories, currentStory).forEach(function (story, index) {
      relatedContainer.appendChild(window.StudentStoryCards.createStoryCard(story, index));
    });
  }

  function renderStory(stories, story) {
    root.innerHTML = buildStoryTemplate(story);
    document.title = story.title + " | Student Story";
    initStoryActions(stories, story);
    initReactionButtons(root);
    initTeacherNoteEditor(story);
    renderRelatedStories(stories, story);
  }

  function renderNotFound() {
    root.innerHTML = '<div class="rounded-3xl border border-black/10 bg-white px-6 py-8 text-black/70">Story not found.</div>';
  }

  // Fetch the shared content source once and render the requested story.
  fetch("./data/student-stories.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to load story detail data");
      }

      return response.json();
    })
    .then(function (data) {
      if (!data || !Array.isArray(data.stories)) {
        throw new Error("student-stories.json must contain a stories array");
      }

      var stories = data.stories
        .map(function (story) {
          return window.StudentStoryCards.applyStoryAdminState(story);
        })
        .filter(function (story) {
          return window.StudentStoryCards.isStoryVisible(story);
        });

      var story = getStoryById(stories, getCurrentStoryId());
      if (!story) {
        renderNotFound();
        return;
      }

      renderStory(stories, story);
    })
    .catch(function (error) {
      console.error(error);
      root.innerHTML = '<div class="rounded-3xl border border-black/10 bg-white px-6 py-8 text-black/70">Story details could not be loaded right now.</div>';
    });
})();


