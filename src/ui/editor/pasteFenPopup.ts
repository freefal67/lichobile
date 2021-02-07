import h from 'mithril/hyperscript'
import i18n from '../../i18n'
import popupWidget from '../shared/popup'
import router from '../../router'
import EditorCtrl from './EditorCtrl'
import { MenuInterface } from './menu'

export default {

  controller(root: EditorCtrl): MenuInterface {
    let isOpen = false

    function open() {
      router.backbutton.stack.push(close)
      isOpen = true
    }

    function close(fromBB?: string) {
      if (fromBB !== 'backbutton' && isOpen) router.backbutton.stack.pop()
      isOpen = false
    }

    return {
      open: open,
      close: close,
      isOpen() {
        return isOpen
      },
      root
    }
  },

  view(ctrl: MenuInterface): Mithril.Children {
    return popupWidget(
      'pasteFenPopup',
      undefined,
      () => {
        return h('form', {
          onsubmit(e: Event) {
            e.preventDefault()
            const input = (e.target as HTMLFormElement)[0] as HTMLInputElement
            const value = input.value
            if (value && value.length)
              ctrl.root.loadNewFen(input.value)
          }
        }, [
          h('input[type=text]', {
            placeholder: i18n('pasteTheFenStringHere'),
          }),
          h('button[data-icon=E].withIcon.popupAction', i18n('loadPosition'))
        ])
      },
      ctrl.isOpen(),
      ctrl.close
    )
  }
}
