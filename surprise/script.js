document.addEventListener('DOMContentLoaded', function() {
    const audioElement = document.getElementById('sound');

    let isCtrlDown = false;

    document.addEventListener('keydown', function(event) {
        if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
            isCtrlDown = true;
        }

        if (isCtrlDown && (event.code === 'ControlLeft' || event.code === 'ControlRight')) {
            if (audioElement.paused) {
                audioElement.play();
            } else {
                audioElement.pause();
            }
        }
    });

    document.addEventListener('keyup', function(event) {
        if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
            isCtrlDown = false;
        }
    });
});
