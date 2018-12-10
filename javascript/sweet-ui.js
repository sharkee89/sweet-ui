$(document).ready(function () {
    initActiveClickListener('.components-container .left-menu ul li');
    initScrollAnimation();
});

function initActiveClickListener(nestedClass) {
    $(nestedClass).click(function () {
        $.each($(nestedClass), function (index, value) {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
        }
    });
}

function initScrollAnimation() {
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 71
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        // $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            // $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
}

// Imports HTML template
function HTMLImporter() { }

HTMLImporter.import = function (url) {

    var error, http_request, load, script;

    script = document.currentScript || document.scripts[document.scripts.length - 1];

    load = function (event) {

        var attribute, index, index1, new_script, old_script, scripts, wrapper;

        wrapper = document.createElement("div");
        wrapper.innerHTML = this.responseText;

        scripts = wrapper.getElementsByTagName("SCRIPT");

        for (index = scripts.length - 1; index > -1; --index) {

            old_script = scripts[index];

            new_script = document.createElement("script");
            new_script.innerHTML = old_script.innerHTML;

            for (index1 = old_script.attributes.length - 1; index1 > -1; --index1) {

                attribute = old_script.attributes[index1];
                new_script.setAttribute(attribute.name, attribute.value);

            }

            old_script.parentNode.replaceChild(new_script, old_script);

        }

        while (wrapper.firstChild) {

            script.parentNode.insertBefore(wrapper.removeChild(wrapper.firstChild), script);

        }

        script.parentNode.removeChild(script);

        this.removeEventListener("error", error);
        this.removeEventListener("load", load);

    };

    error = function (event) {

        this.removeEventListener("error", error);
        this.removeEventListener("load", load);

        alert("there was an error!");

    };

    http_request = new XMLHttpRequest();
    http_request.addEventListener("error", error);
    http_request.addEventListener("load", load);
    http_request.open("GET", url);
    http_request.send();

};