// ==UserScript==
// @name            Netflix Seeker
// @homepageURL     https://github.com/aminomancer/Netflix-Seeker-Personal-Edit
// @icon            https://www.netflix.com/favicon.ico
// @updateURL       https://raw.githubusercontent.com/aminomancer/Netflix-Seeker-Personal-Edit/master/netflixSeeker.js
// @version         0.2
// @description     fast-forward, fast-backward with arrow keys in netflix player
// @author          supernovel
// @match           *://www.netflix.com/*
// ==/UserScript==

(function() {
    function createNetflixSeeker() {
      const DEFAULT_SEEK_AMOUNT = 20;
      const BIG_SEEK_AMOUNT = 30;
      const PROGRESS_CONTROL_SELECTOR =
        ".PlayerControls--control-element.progress-control";
      const ARROW_LEFT_KEYCODE = 37;
      const ARROW_RIGHT_KEYCODE = 39;
  
      const options = {
        seekAmount: DEFAULT_SEEK_AMOUNT,
        seek2Amount: BIG_SEEK_AMOUNT
      };
  
      // Credits to Venryx @ https://stackoverflow.com/questions/29321742/react-getting-a-component-from-a-dom-element-for-debugging
      function findReact(dom) {
        for (var key in dom) {
          if (key.startsWith("__reactInternalInstance$")) {
            return dom[key].child;
          }
        }
        return null;
      }
  
      function getReactFromSelector(selector) {
        const elems = document.querySelectorAll(selector);
        return elems.length > 0 ? findReact(elems[0]) : null;
      }
  
      function getPlayer() {
        const comp = getReactFromSelector(PROGRESS_CONTROL_SELECTOR);
        return comp ? comp.memoizedProps.player : null;
      }
  
      function fastForward(seconds) {
        const player = getPlayer();
        if (!player) {
          return;
        }
  
        player.seek(player.getCurrentTime() + seconds);
      }
      
      function multForward(factor) {
        const player = getPlayer();
        if (!player) {
          return;
        }
  
        player.seek(player.getCurrentTime() + (player.getDuration() * factor));
      }
  
      function onKeyDown(e) {
        if ([ARROW_LEFT_KEYCODE, ARROW_RIGHT_KEYCODE].indexOf(e.keyCode) < 0) {
          return;
        }
  
        e.stopPropagation();
  
        if (e.keyCode === ARROW_LEFT_KEYCODE && !event.shiftKey) {
          document.getElementsByClassName('button-nfplayerBackTen')[0].click();
        } if (e.keyCode === ARROW_RIGHT_KEYCODE && !event.shiftKey) {
          document.getElementsByClassName('button-nfplayerFastForward')[0].click();
        } if (e.keyCode === ARROW_LEFT_KEYCODE && event.shiftKey) {
          document.getElementsByClassName('button-nfplayerBackTen')[0].click();
          document.getElementsByClassName('button-nfplayerBackTen')[0].click();
          document.getElementsByClassName('button-nfplayerBackTen')[0].click();
          document.getElementsByClassName('button-nfplayerBackTen')[0].click();
        } if (e.keyCode === ARROW_RIGHT_KEYCODE && event.shiftKey) {
          document.getElementsByClassName('button-nfplayerFastForward')[0].click();
          document.getElementsByClassName('button-nfplayerFastForward')[0].click();
          document.getElementsByClassName('button-nfplayerFastForward')[0].click();
          document.getElementsByClassName('button-nfplayerFastForward')[0].click();
        }
      }
  
      function startCapturing() {
        window.addEventListener("keydown", onKeyDown, true);
      }
  
      function stopCapturing() {
        window.removeEventListener("keydown", onKeyDown, true);
      }
  
      function destroy() {
        stopCapturing();
      }
  
      startCapturing();
  
      return {
        startCapturing,
        stopCapturing,
        getPlayer,
        fastForward,
        options,
        destroy
      };
    }
  
    createNetflixSeeker();
  })();
  