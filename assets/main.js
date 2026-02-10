(function () {
  "use strict";

  var copy = window.BenchmarkERSCopy;

  if (!copy) {
    console.error("Site copy was not loaded.");
    return;
  }

  function getCopy(path) {
    return path.split(".").reduce(function (acc, key) {
      return acc && Object.prototype.hasOwnProperty.call(acc, key) ? acc[key] : undefined;
    }, copy);
  }

  function applyCopy(root) {
    var scope = root || document;

    scope.querySelectorAll("[data-copy]").forEach(function (el) {
      var value = getCopy(el.dataset.copy);
      if (typeof value === "string" || typeof value === "number") {
        el.textContent = value;
      }
    });

    scope.querySelectorAll("[data-copy-html]").forEach(function (el) {
      var value = getCopy(el.dataset.copyHtml);
      if (typeof value === "string") {
        el.innerHTML = value;
      }
    });

    scope.querySelectorAll("[data-copy-href]").forEach(function (el) {
      var value = getCopy(el.dataset.copyHref);
      if (typeof value === "string") {
        el.setAttribute("href", value);
      }
    });

    scope.querySelectorAll("[data-copy-placeholder]").forEach(function (el) {
      var value = getCopy(el.dataset.copyPlaceholder);
      if (typeof value === "string") {
        el.setAttribute("placeholder", value);
      }
    });

    scope.querySelectorAll("[data-copy-alt]").forEach(function (el) {
      var value = getCopy(el.dataset.copyAlt);
      if (typeof value === "string") {
        el.setAttribute("alt", value);
      }
    });

    scope.querySelectorAll("[data-copy-aria-label]").forEach(function (el) {
      var value = getCopy(el.dataset.copyAriaLabel);
      if (typeof value === "string") {
        el.setAttribute("aria-label", value);
      }
    });
  }

  function setDocumentTitle() {
    var page = document.body.dataset.page;
    var title = getCopy("meta.titles." + page);
    if (title) {
      document.title = title;
    }
  }

  function setCurrentYear() {
    var year = new Date().getFullYear();
    document.querySelectorAll("[data-current-year]").forEach(function (el) {
      el.textContent = String(year);
    });
  }

  function setActiveNav() {
    var page = document.body.dataset.page;
    document.querySelectorAll(".nav-link").forEach(function (link) {
      if (link.dataset.nav === page) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function createCard(title, body, className) {
    var card = document.createElement("article");
    card.className = className;

    var heading = document.createElement("h3");
    heading.textContent = title;

    var paragraph = document.createElement("p");
    paragraph.textContent = body;

    card.appendChild(heading);
    card.appendChild(paragraph);
    return card;
  }

  function renderList(containerId, items) {
    var container = document.getElementById(containerId);
    if (!container || !Array.isArray(items)) {
      return;
    }

    container.innerHTML = "";
    items.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      container.appendChild(li);
    });
  }

  function renderHome() {
    if (!document.getElementById("home-page")) {
      return;
    }

    renderList("problem-points", getCopy("home.problem.points"));
    renderList("solution-points", getCopy("home.solution.points"));

    var stepsContainer = document.getElementById("how-steps");
    var steps = getCopy("home.howItWorks.steps");
    if (stepsContainer && Array.isArray(steps)) {
      stepsContainer.innerHTML = "";
      steps.forEach(function (step) {
        var li = document.createElement("li");
        li.className = "step-card";

        var heading = document.createElement("h3");
        heading.textContent = step.title;

        var paragraph = document.createElement("p");
        paragraph.textContent = step.body;

        li.appendChild(heading);
        li.appendChild(paragraph);
        stepsContainer.appendChild(li);
      });
    }

    var featuresContainer = document.getElementById("features-grid");
    var features = getCopy("home.features.items");
    if (featuresContainer && Array.isArray(features)) {
      featuresContainer.innerHTML = "";
      features.forEach(function (feature) {
        var card = document.createElement("article");
        card.className = "feature-card";
        var text = document.createElement("p");
        text.textContent = feature;
        card.appendChild(text);
        featuresContainer.appendChild(card);
      });
    }

    var legendContainer = document.getElementById("legend-grid");
    var legendItems = getCopy("home.legend.items");
    if (legendContainer && Array.isArray(legendItems)) {
      legendContainer.innerHTML = "";
      legendItems.forEach(function (item) {
        var card = document.createElement("article");
        card.className = "legend-card";

        var swatch = document.createElement("span");
        swatch.className = "status-swatch status-" + item.statusKey;
        swatch.setAttribute("aria-hidden", "true");

        var heading = document.createElement("h3");
        heading.textContent = item.label;

        var body = document.createElement("p");
        body.textContent = item.description;

        card.appendChild(swatch);
        card.appendChild(heading);
        card.appendChild(body);
        legendContainer.appendChild(card);
      });
    }

    var integrationsContainer = document.getElementById("integrations-grid");
    var integrations = getCopy("home.integrations.items");
    if (integrationsContainer && Array.isArray(integrations)) {
      integrationsContainer.innerHTML = "";
      integrations.forEach(function (item) {
        integrationsContainer.appendChild(createCard(item.title, item.body, "integration-card"));
      });
    }

    renderList("security-points", getCopy("home.security.points"));

    var faqContainer = document.getElementById("faq-list");
    var faqItems = getCopy("home.faq.items");
    if (faqContainer && Array.isArray(faqItems)) {
      faqContainer.innerHTML = "";
      faqItems.forEach(function (item) {
        var details = document.createElement("details");
        details.className = "faq-item";

        var summary = document.createElement("summary");
        summary.textContent = item.question;

        var answer = document.createElement("p");
        answer.textContent = item.answer;

        details.appendChild(summary);
        details.appendChild(answer);
        faqContainer.appendChild(details);
      });
    }
  }

  function renderAbout() {
    if (!document.getElementById("about-page")) {
      return;
    }

    var audienceContainer = document.getElementById("about-audience-grid");
    var audienceItems = getCopy("about.forWho.items");
    if (audienceContainer && Array.isArray(audienceItems)) {
      audienceContainer.innerHTML = "";
      audienceItems.forEach(function (item) {
        audienceContainer.appendChild(createCard(item.title, item.body, "audience-card"));
      });
    }

    var roadmapContainer = document.getElementById("roadmap-list");
    var roadmapItems = getCopy("about.roadmap.items");
    if (roadmapContainer && Array.isArray(roadmapItems)) {
      roadmapContainer.innerHTML = "";
      roadmapItems.forEach(function (item) {
        var li = document.createElement("li");
        li.className = "roadmap-item";

        var heading = document.createElement("h3");
        heading.textContent = item.title;

        var paragraph = document.createElement("p");
        paragraph.textContent = item.body;

        li.appendChild(heading);
        li.appendChild(paragraph);
        roadmapContainer.appendChild(li);
      });
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setFieldError(fieldName, message) {
    var input = document.getElementById(fieldName);
    var error = document.getElementById("error-" + fieldName);

    if (!input || !error) {
      return;
    }

    error.textContent = message || "";
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function buildMailto(name, email, role, message) {
    var subject = getCopy("contact.form.mailtoSubject") || "Benchmark ERS inquiry";
    var emailHref = getCopy("shared.contact.emailHref") || "mailto:hello@benchmark-ers.example";
    var targetEmail = emailHref.replace("mailto:", "");

    var body = [
      "Name: " + name,
      "Email: " + email,
      "Role: " + role,
      "",
      "Message:",
      message
    ].join("\n");

    return "mailto:" + targetEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function getDeliveryEndpoint() {
    var endpoint = getCopy("contact.form.delivery.endpoint");
    if (typeof endpoint !== "string") {
      return "";
    }

    var cleaned = endpoint.trim();
    if (!cleaned || cleaned.indexOf("REPLACE_WITH_") === 0) {
      return "";
    }

    return cleaned;
  }

  function setupContactForm() {
    var page = document.getElementById("contact-page");
    if (!page) {
      return;
    }

    var roles = getCopy("contact.form.roles");
    var roleSelect = document.getElementById("role");
    if (roleSelect && Array.isArray(roles)) {
      roles.forEach(function (role) {
        var option = document.createElement("option");
        option.value = role.value;
        option.textContent = role.label;
        roleSelect.appendChild(option);
      });
    }

    var form = document.getElementById("contact-form");
    var feedback = document.getElementById("form-feedback");
    var feedbackMessage = document.getElementById("feedback-message");
    var mailtoFallback = document.getElementById("mailto-fallback");
    var submitButton = form ? form.querySelector("button[type='submit']") : null;

    if (!form || !feedback || !feedbackMessage || !mailtoFallback) {
      return;
    }

    function setSubmitting(isSubmitting) {
      if (!submitButton) {
        return;
      }

      submitButton.disabled = isSubmitting;
      submitButton.textContent = isSubmitting
        ? (getCopy("contact.form.sendingLabel") || "Sending...")
        : (getCopy("contact.form.submitLabel") || "Send Request");
    }

    function showFeedback(message, isError) {
      feedbackMessage.textContent = message;
      feedback.classList.toggle("error", !!isError);
      feedback.classList.remove("hidden");
    }

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var role = form.role.value.trim();
      var message = form.message.value.trim();

      var validation = getCopy("contact.form.validation") || {};
      var hasError = false;

      setFieldError("name", "");
      setFieldError("email", "");
      setFieldError("role", "");
      setFieldError("message", "");

      if (!name) {
        setFieldError("name", validation.requiredName || "Please enter your name.");
        hasError = true;
      }

      if (!email) {
        setFieldError("email", validation.requiredEmail || "Please enter your email.");
        hasError = true;
      } else if (!validateEmail(email)) {
        setFieldError("email", validation.invalidEmail || "Enter a valid email address.");
        hasError = true;
      }

      if (!role) {
        setFieldError("role", validation.requiredRole || "Please choose your role.");
        hasError = true;
      }

      if (!message || message.length < 10) {
        setFieldError("message", validation.requiredMessage || "Please add a short message (10+ characters).");
        hasError = true;
      }

      if (hasError) {
        return;
      }

      mailtoFallback.setAttribute("href", buildMailto(name, email, role, message));
      feedback.classList.remove("error");

      var endpoint = getDeliveryEndpoint();
      if (!endpoint) {
        showFeedback(
          getCopy("contact.form.deliveryNotConfiguredMessage") ||
            "Form delivery is not configured yet. Please use direct email below.",
          true
        );
        return;
      }

      setSubmitting(true);

      try {
        var payload = new FormData();
        payload.append("name", name);
        payload.append("email", email);
        payload.append("role", role);
        payload.append("message", message);
        payload.append("_subject", getCopy("contact.form.mailtoSubject") || "Benchmark ERS inquiry");
        payload.append("_source", window.location.href);

        var response = await fetch(endpoint, {
          method: "POST",
          headers: {
            Accept: "application/json"
          },
          body: payload
        });

        if (!response.ok) {
          throw new Error("Submission failed");
        }

        showFeedback(getCopy("contact.form.successMessage") || "Thanks — we'll reach out.", false);
        form.reset();
      } catch (error) {
        showFeedback(
          getCopy("contact.form.sendErrorMessage") ||
            "We couldn't send your message right now. Please use direct email below.",
          true
        );
      } finally {
        setSubmitting(false);
      }
    });
  }

  function init() {
    setDocumentTitle();
    applyCopy(document);
    setCurrentYear();
    setActiveNav();
    renderHome();
    renderAbout();
    setupContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
