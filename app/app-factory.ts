
import {DragGestureRecognizerProvider} from './utils/gestures/drag-gesture-recognizer-provider';
import {PinchGestureRecognizerProvider} from './utils/gestures/pinch-gesture-recognizer-provider';
import {PressGestureRecognizerProvider} from './utils/gestures/press-gesture-recognizer-provider';
import {RotateGestureRecognizerProvider} from './utils/gestures/rotate-gesture-recognizer-provider';
import {SwipeGestureRecognizerProvider} from './utils/gestures/swipe-gesture-recognizer-provider';
import {TapGestureRecognizerProvider} from './utils/gestures/tap-gesture-recognizer-provider';

import {EmailDataProvider} from './pages/inbox/email-data-provider';

import {ScrollDisabler} from './utils/scroll-disabler';
import {WindowProvider} from './utils/window-provider';

export function getProviders(){
    let providers = [];

    providers.push(EmailDataProvider);

    /* Gesture Recognizers */
    providers.push(DragGestureRecognizerProvider);
    providers.push(PinchGestureRecognizerProvider);
    providers.push(PressGestureRecognizerProvider);
    providers.push(RotateGestureRecognizerProvider);
    providers.push(SwipeGestureRecognizerProvider);
    providers.push(TapGestureRecognizerProvider);

    providers.push(ScrollDisabler);
    providers.push(WindowProvider);

    return providers;
}
