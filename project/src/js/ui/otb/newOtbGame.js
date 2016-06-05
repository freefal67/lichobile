import m from 'mithril';
import i18n from '../../i18n';
import settings from '../../settings';
import formWidgets from '../shared/form';
import popupWidget from '../shared/popup';
import helper from '../helper';
import backbutton from '../../backbutton';
import clock from './clock';

export default {

  controller: function(root) {
    let isOpen = false;

    function open() {
      backbutton.stack.push(close);
      isOpen = true;
    }

    function close(fromBB) {
      if (fromBB !== 'backbutton' && isOpen) backbutton.stack.pop();
      isOpen = false;
    }

    return {
      open: open,
      close: close,
      isOpen: function() {
        return isOpen;
      },
      root: root
    };
  },

  view: function(ctrl) {
    console.log(settings.otb.clockType());
    if (ctrl.isOpen()) {
      return popupWidget(
        'new_offline_game',
        null,
        function() {
          return (
            <div>
              <div className="action">
                <div className="select_input">
                  {formWidgets.renderSelect('variant', 'variant', settings.otb.availableVariants, settings.otb.variant)}
                </div>
                <div className="select_input">
                  {formWidgets.renderSelect('Clock', 'clock', settings.otb.availableClocks, settings.otb.clockType, false, () => m.redraw())}
                </div>
                {clock.clockSettingsView[settings.otb.clockType()]()}
              </div>
              <button className="newGameButton" data-icon="E"
                config={helper.ontouch(() => ctrl.root.startNewGame())}>
                {i18n('createAGame')}
              </button>
            </div>
          );
        },
        ctrl.isOpen(),
        ctrl.close
      );
    }

    return null;
  }
};
