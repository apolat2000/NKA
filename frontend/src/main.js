import Vue from 'vue';

import VueTailwind from 'vue-tailwind';
import TInput from 'vue-tailwind/dist/t-input';
import TTextarea from 'vue-tailwind/dist/t-textarea';
import TSelect from 'vue-tailwind/dist/t-select';
import TRadio from 'vue-tailwind/dist/t-radio';
import TCheckbox from 'vue-tailwind/dist/t-checkbox';
import TButton from 'vue-tailwind/dist/t-button';
import TInputGroup from 'vue-tailwind/dist/t-input-group';
import TRichSelect from 'vue-tailwind/dist/t-rich-select';
import TDatepicker from 'vue-tailwind/dist/t-datepicker';
import TTag from 'vue-tailwind/dist/t-tag';
import TToggle from 'vue-tailwind/dist/t-toggle';
import TAlert from 'vue-tailwind/dist/t-alert';
import TCard from 'vue-tailwind/dist/t-card';
import TModal from 'vue-tailwind/dist/t-modal';
import TDialog from 'vue-tailwind/dist/t-dialog';
import TTable from 'vue-tailwind/dist/t-table';
import TPagination from 'vue-tailwind/dist/t-pagination';
import TDropdown from 'vue-tailwind/dist/t-dropdown';

import App from './App.vue'
import './assets/css/tailwind.css';

import 'semantic-ui-css/semantic.css';
import router from './Router'
import { Inkline } from '@inkline/inkline/src';
import * as components from '@inkline/inkline/src/components';
import '@inkline/inkline/src/inkline.scss';

Vue.use(Inkline, { components });


const settings = {
  't-input': {
    component: TInput,
    props: {
      fixedClasses: 'bg-gray-600 block w-full px-3 py-2 transition duration-100 ease-in-out border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'text-white font-semibold placeholder-gray-400 bg-white border-black focus:border-blue-500 ',
      variants: {
        danger: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
        success: 'border-green-300 bg-green-50 placeholder-gray-400 text-green-900'
      }
    }
  },
  't-textarea': {
    component: TTextarea,
    props: {
      fixedClasses: 'block h-32 px-3 py-2 transition duration-100 ease-in-out border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'text-white text-sm font-semibold placeholder-gray-400 bg-gray-600 border-black focus:border-blue-500 ',
      variants: {
        danger: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
        comment: 'bg-purple-400 focus:bg-nkayellow placeholder-gray-800 text-black shadow-inner',
        success: 'border-green-300 bg-green-50 placeholder-gray-400 text-green-900'
      }
    }
  },
  't-select': {
    component: TSelect,
    props: {
      fixedClasses: 'block w-full transition duration-100 ease-in-out border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'text-white pl-3 pr-10 py-2 font-semibold placeholder-gray-400 bg-gray-600 border-black focus:border-blue-500',
      variants: {
        danger: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
        comment: 'text-white font-semibold placeholder-gray-400 bg-gray-600 border-black focus:border-blue-500',
        success: 'border-green-300 bg-green-50 placeholder-gray-400 text-green-900'
      }
    }
  },
  't-radio': {
    component: TRadio,
    props: {
      fixedClasses: 'transition duration-100 ease-in-out shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'text-blue-500 border-gray-300',
      variants: {
        error: 'text-red-500 border-red-300',
        success: 'text-green-500 border-green-300'
      }
    }
  },
  't-checkbox': {
    component: TCheckbox,
    props: {
      fixedClasses: 'transition duration-100 ease-in-out rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'text-blue-500 border-gray-300 ',
      variants: {
        error: 'text-red-500 border-red-300',
        success: 'text-green-500 border-green-300'
      }
    }
  },
  't-button': {
    component: TButton,
    props: {
      fixedClasses: 'block transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'bg-gray-600 hover:bg-gray-500 text-white text-sm font-semibold py-4 px-4 border border-black rounded-md shadow',
      variants: {
        yellow: 'bg-nkayellow hover:bg-yellow-300 text-black font-semibold py-4 w-full border border-black rounded shadow mr-4',
        secondary: 'text-gray-800 bg-white border border-gray-300 shadow-sm hover:text-gray-600',
        activeCircle: 'px-3 py-2 rounded-full h-auto items-center justify-center text-black hover:bg-nkayellow bg-green-400 border border-black shadow-sm',
        inactiveCircle: 'px-3 py-2 rounded-full h-auto items-center justify-center text-black hover:bg-nkayellow bg-red-400 border border-black shadow-sm',
        error: 'text-white text-center bg-red-500 border border-transparent rounded-full p-4 shadow-sm hover:bg-red-600',
        success: 'text-white text-center bg-green-500 border border-transparent rounded-full p-4 shadow-sm hover:bg-green-600',
        link: 'text-blue-500 underline hover:text-blue-600'
      }
    }
  },
  't-input-group': {
    component: TInputGroup,
    props: {
      fixedClasses: {
        wrapper: '',
        label: 'block',
        body: '',
        feedback: ' text-sm text-sm',
        description: 'text-gray-400 text-sm'
      },
      classes: {
        wrapper: '',
        label: '',
        body: '',
        feedback: 'text-gray-400',
        description: 'text-gray-400'
      },
      variants: {
        danger: {
          label: 'text-red-500',
          feedback: 'text-red-500'
        },
        success: {
          label: 'text-green-500',
          feedback: 'text-green-500'
        }
      }
    }
  },
  't-rich-select': {
    component: TRichSelect,
    props: {
      fixedClasses: {
        wrapper: 'relative',
        buttonWrapper: 'inline-block relative w-full',
        selectButton: 'w-full flex text-left justify-between items-center px-3 py-2 text-black transition duration-100 ease-in-out border rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
        selectButtonLabel: 'block truncate',
        selectButtonPlaceholder: 'block truncate',
        selectButtonIcon: 'fill-current flex-shrink-0 ml-1 h-4 w-4',
        selectButtonClearButton: 'rounded-md flex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 h-6 w-6 transition duration-100 ease-in-out',
        selectButtonClearIcon: 'fill-current h-3 w-3',
        dropdown: 'absolute w-full z-10 -mt-1 absolute border-b border-l border-r rounded-md-b shadow-sm z-10',
        dropdownFeedback: '',
        loadingMoreResults: '',
        optionsList: 'overflow-auto',
        searchWrapper: 'inline-block w-full',
        searchBox: 'inline-block w-full',
        optgroup: '',
        option: 'cursor-pointer',
        disabledOption: 'opacity-50 cursor-not-allowed',
        highlightedOption: 'cursor-pointer',
        selectedOption: 'cursor-pointer',
        selectedHighlightedOption: 'cursor-pointer',
        optionContent: '',
        optionLabel: 'truncate block',
        selectedIcon: 'fill-current h-4 w-4',
        enterClass: '',
        enterActiveClass: '',
        enterToClass: '',
        leaveClass: '',
        leaveActiveClass: '',
        leaveToClass: ''
      },
      classes: {
        wrapper: '',
        buttonWrapper: '',
        selectButton: 'bg-white border-gray-300',
        selectButtonLabel: '',
        selectButtonPlaceholder: 'text-gray-400',
        selectButtonIcon: 'text-gray-600',
        selectButtonClearButton: 'hover:bg-blue-100 text-gray-600',
        selectButtonClearIcon: '',
        dropdown: 'bg-white border-gray-300',
        dropdownFeedback: 'pb-2 px-3 text-gray-400 text-sm',
        loadingMoreResults: 'pb-2 px-3 text-gray-400 text-sm',
        optionsList: '',
        searchWrapper: 'p-2 placeholder-gray-400',
        searchBox: 'px-3 py-2 bg-gray-50 text-sm rounded-md border focus:outline-none focus:shadow-outline border-gray-300',
        optgroup: 'text-gray-400 uppercase text-xs py-1 px-2 font-semibold',
        option: '',
        disabledOption: '',
        highlightedOption: 'bg-blue-100',
        selectedOption: 'font-semibold bg-gray-100 bg-blue-500 font-semibold text-white',
        selectedHighlightedOption: 'font-semibold bg-gray-100 bg-blue-600 font-semibold text-white',
        optionContent: 'flex justify-between items-center px-3 py-2',
        optionLabel: '',
        selectedIcon: '',
        enterClass: '',
        enterActiveClass: 'opacity-0 transition ease-out duration-100',
        enterToClass: 'opacity-100',
        leaveClass: 'transition ease-in opacity-100',
        leaveActiveClass: '',
        leaveToClass: 'opacity-0 duration-75'
      },
      variants: {
        danger: {
          selectButton: 'border-red-300 bg-red-50 text-red-900',
          selectButtonPlaceholder: 'text-red-200',
          selectButtonIcon: 'text-red-500',
          selectButtonClearButton: 'hover:bg-red-200 text-red-500',
          dropdown: 'bg-red-50 border-red-300'
        },
        success: {
          selectButton: 'border-green-300 bg-green-50 text-green-900',
          selectButtonIcon: 'text-green-500',
          selectButtonClearButton: 'hover:bg-green-200 text-green-500',
          dropdown: 'bg-green-50 border-green-300'
        }
      }
    }
  },
  't-datepicker': {
    component: TDatepicker,
    props: {
      fixedClasses: {
        navigator: 'flex',
        navigatorViewButton: 'flex items-center',
        navigatorViewButtonIcon: 'flex-shrink-0 h-5 w-5',
        navigatorViewButtonBackIcon: 'flex-shrink-0 h-5 w-5',
        navigatorLabel: 'flex items-center py-1',
        navigatorPrevButtonIcon: 'h-6 w-6 inline-flex',
        navigatorNextButtonIcon: 'h-6 w-6 inline-flex',
        inputWrapper: 'relative',
        viewGroup: 'inline-flex flex-wrap',
        view: 'w-64',
        calendarDaysWrapper: 'grid grid-cols-7',
        calendarHeaderWrapper: 'grid grid-cols-7',
        monthWrapper: 'grid grid-cols-4',
        yearWrapper: 'grid grid-cols-4',
        input: 'bg-gray-600 block w-full px-3 py-2 transition duration-100 ease-in-out border-black rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
        clearButton: 'wflex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 h-6 w-6',
        clearButtonIcon: 'fill-current h-3 w-3'
      },
      classes: {
        wrapper: 'flex flex-col',
        dropdownWrapper: 'relative z-10',
        dropdown: 'origin-top-left absolute border-2 border-black rounded-md shadow bg-white overflow-hidden mt-1',
        enterClass: '',
        enterActiveClass: 'transition ease-out duration-100 transform opacity-0 scale-95',
        enterToClass: 'transform opacity-100 scale-100',
        leaveClass: 'transition ease-in transform opacity-100 scale-100',
        leaveActiveClass: '',
        leaveToClass: 'transform opacity-0 scale-95 duration-75',
        inlineWrapper: '',
        inlineViews: 'rounded-md bg-white border mt-1 inline-flex',
        inputWrapper: '',
        input: 'text-white font-semibold placeholder-gray-400 border-black',
        clearButton: 'hover:bg-indigo-800 rounded-md transition duration-100 ease-in-out text-white',
        clearButtonIcon: '',
        viewGroup: '',
        view: '',
        navigator: 'pt-2 px-3',
        navigatorViewButton: 'transition ease-in-out duration-100 inline-flex cursor-pointer rounded-md-full px-2 py-1 -ml-1 hover:bg-gray-100',
        navigatorViewButtonIcon: 'fill-current text-gray-400',
        navigatorViewButtonBackIcon: 'fill-current text-gray-400',
        navigatorViewButtonMonth: 'text-gray-700 font-semibold',
        navigatorViewButtonYear: 'text-gray-500 ml-1',
        navigatorViewButtonYearRange: 'text-gray-500 ml-1',
        navigatorLabel: 'py-1',
        navigatorLabelMonth: 'text-gray-700 font-semibold',
        navigatorLabelYear: 'text-gray-500 ml-1',
        navigatorPrevButton: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100 rounded-md-full p-1 ml-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed',
        navigatorNextButton: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100 rounded-md-full p-1 -mr-1 disabled:opacity-50 disabled:cursor-not-allowed',
        navigatorPrevButtonIcon: 'text-gray-400',
        navigatorNextButtonIcon: 'text-gray-400',
        calendarWrapper: 'px-3 pt-2',
        calendarHeaderWrapper: '',
        calendarHeaderWeekDay: 'uppercase text-xs text-gray-500 w-8 h-8 flex items-center justify-center',
        calendarDaysWrapper: '',
        calendarDaysDayWrapper: 'w-full h-8 flex flex-shrink-0 items-center',
        otherMonthDay: 'text-sm rounded-md-full w-8 h-8 mx-auto hover:bg-blue-100 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed',
        emptyDay: '',
        inRangeFirstDay: 'text-sm bg-blue-500 text-white w-full h-8 rounded-md-l-full',
        inRangeLastDay: 'text-sm bg-blue-500 text-white w-full h-8 rounded-md-r-full',
        inRangeDay: 'text-sm bg-blue-200 w-full h-8 disabled:opacity-50 disabled:cursor-not-allowed',
        selectedDay: 'text-sm rounded-md-full w-8 h-8 mx-auto bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed',
        activeDay: 'text-sm rounded-md-full bg-blue-100 w-8 h-8 mx-auto disabled:opacity-50 disabled:cursor-not-allowed',
        highlightedDay: 'text-sm rounded-md-full bg-blue-200 w-8 h-8 mx-auto disabled:opacity-50 disabled:cursor-not-allowed',
        day: 'text-sm rounded-md-full w-8 h-8 mx-auto hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed',
        today: 'text-sm rounded-md-full w-8 h-8 mx-auto hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500',
        monthWrapper: 'px-3 pt-2',
        selectedMonth: 'text-sm rounded-md w-full h-12 mx-auto bg-blue-500 text-white',
        activeMonth: 'text-sm rounded-md w-full h-12 mx-auto bg-blue-100',
        month: 'text-sm rounded-md w-full h-12 mx-auto hover:bg-blue-100',
        yearWrapper: 'px-3 pt-2',
        year: 'text-sm rounded-md w-full h-12 mx-auto hover:bg-blue-100',
        selectedYear: 'text-sm rounded-md w-full h-12 mx-auto bg-blue-500 text-white',
        activeYear: 'text-sm rounded-md w-full h-12 mx-auto bg-blue-100'
      },
      variants: {
        danger: {
          input: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
          clearButton: 'hover:bg-red-200 text-red-500'
        }
      }
    }
  },
  't-tag': {
    component: TTag,
    props: {
      fixedClasses: '',
      classes: '',
      variants: {
        title: 'text-2xl leading-8 font-extrabold text-gray-900 tracking-tight',
        subtitle: 'text-lg leading-6 font-medium text-gray-900',
        error: 'text-red-500',
        badge: 'inline-flex items-center px-3 rounded-md-full text-xs font-medium leading-4 bg-gray-100 text-gray-800',
        avatar: 'inline-flex items-center justify-center h-10 w-10 rounded-md-full bg-gray-500 overflow-hidden leading-none text-center'
      }
    }
  },
  't-toggle': {
    component: TToggle,
    props: {
      fixedClasses: {
        wrapper: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
        wrapperChecked: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200  border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
        wrapperDisabled: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed',
        wrapperCheckedDisabled: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
        button: 'inline-block absolute transform translate-x-0 transition ease-in-out duration-200',
        buttonChecked: 'inline-block absolute transform translate-x-full transition ease-in-out duration-200',
        checkedPlaceholder: 'inline-block',
        uncheckedPlaceholder: 'inline-block'
      },
      classes: {
        wrapper: 'bg-gray-100 rounded-md-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
        wrapperChecked: 'bg-blue-500 rounded-md-full',
        wrapperDisabled: 'bg-gray-100 rounded-md-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
        wrapperCheckedDisabled: 'bg-blue-500',
        button: 'h-5 w-5 rounded-md-full bg-white shadow flex items-center justify-center text-gray-400 text-xs',
        buttonChecked: 'h-5 w-5 rounded-md-full bg-white shadow flex items-center justify-center text-blue-500 text-xs',
        checkedPlaceholder: 'rounded-md-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
        uncheckedPlaceholder: 'rounded-md-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs'
      },
      variants: {
        danger: {
          wrapperChecked: 'bg-red-500 rounded-md-full',
          wrapperCheckedDisabled: 'bg-red-500 rounded-md-full'
        },
        success: {
          wrapperChecked: 'bg-green-500 rounded-md-full',
          wrapperCheckedDisabled: 'bg-green-500 rounded-md-full'
        },
        box: {
          wrapper: 'bg-gray-100 rounded-md-sm border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
          wrapperChecked: 'bg-blue-500 rounded-md-sm',
          wrapperCheckedDisabled: 'bg-blue-500 rounded-md-sm',
          button: 'h-6 w-6 rounded-md-sm bg-white shadow flex items-center justify-center text-gray-400 text-xs',
          buttonChecked: 'h-6 w-6 rounded-md-sm  bg-white shadow flex items-center justify-center text-blue-500 text-xs',
          checkedPlaceholder: 'rounded-md-sm w-6 h-6 flex items-center justify-center text-gray-400 text-xs',
          uncheckedPlaceholder: 'rounded-md-sm w-6 h-6 flex items-center justify-center text-gray-400 text-xs'
        }
      }
    }
  },
  't-alert': {
    component: TAlert,
    props: {
      fixedClasses: {
        wrapper: 'flex items-center p-4 border-l-4 rounded-md shadow-sm',
        body: 'flex-grow',
        close: 'absolute relative flex items-center justify-center ml-4 flex-shrink-0 w-6 h-6 transition duration-100 ease-in-out rounded-md  focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
        closeIcon: 'fill-current h-4 w-4'
      },
      classes: {
        wrapper: 'bg-blue-50 border-blue-500',
        body: 'text-blue-700',
        close: 'text-blue-500 hover:bg-blue-200'
      },
      variants: {
        danger: {
          wrapper: 'bg-nkayellow border-yellow-500',
          body: 'text-black',
          close: 'text-yellow-800 hover:bg-yellow-200'
        },
        success: {
          wrapper: 'bg-green-50 border-green-500',
          body: 'text-green-700',
          close: 'text-green-500 hover:bg-green-200'
        }
      }
    }
  },
  't-card': {
    component: TCard,
    props: {
      fixedClasses: {
        wrapper: 'border rounded-md shadow-sm ',
        body: 'p-3',
        header: 'border-b p-3 rounded-md-t',
        footer: 'border-t p-3 rounded-md-b'
      },
      classes: {
        wrapper: 'bg-white border-gray-100',
        body: '',
        header: 'border-gray-100',
        footer: 'border-gray-100'
      },
      variants: {
        danger: {
          wrapper: 'bg-red-50 text-red-700 border-red-200',
          header: 'border-red-200 text-red-700',
          footer: 'border-red-200 text-red-700'
        }
      }
    }
  },
  't-modal': {
    component: TModal,
    props: {
      fixedClasses: {
        overlay: 'z-40  overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-opacity-50',
        wrapper: 'relative mx-auto z-50 max-w-lg px-3 py-12',
        modal: 'overflow-visible relative  rounded-md',
        body: 'p-3',
        header: 'border-b p-3 rounded-md-t',
        footer: ' p-3 rounded-md-b',
        close: 'flex items-center justify-center rounded-md-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50'
      },
      classes: {
        overlay: 'bg-black',
        wrapper: '',
        modal: 'bg-white shadow',
        body: 'p-3',
        header: 'border-gray-100',
        footer: 'bg-gray-100',
        close: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        closeIcon: 'fill-current h-4 w-4',
        overlayEnterClass: '',
        overlayEnterActiveClass: 'opacity-0 transition ease-out duration-100',
        overlayEnterToClass: 'opacity-100',
        overlayLeaveClass: 'transition ease-in opacity-100',
        overlayLeaveActiveClass: '',
        overlayLeaveToClass: 'opacity-0 duration-75',
        enterClass: '',
        enterActiveClass: '',
        enterToClass: '',
        leaveClass: '',
        leaveActiveClass: '',
        leaveToClass: ''
      },
      variants: {
        danger: {
          overlay: 'bg-red-100',
          header: 'border-red-50 text-red-700',
          close: 'bg-red-50 text-red-700 hover:bg-red-200 border-red-100 border',
          modal: 'bg-white border border-red-100 shadow-lg',
          footer: 'bg-red-50'
        }
      }
    }
  },
  't-dialog': {
    component: TDialog,
    props: {
      fixedClasses: {
        overlay: 'overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed z-40 bg-opacity-50',
        wrapper: 'relative mx-auto',
        modal: 'overflow-visible relative ',
        close: 'flex items-center justify-center  rounded-md-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
        dialog: 'overflow-visible relative',
        iconWrapper: 'flex flex-shrink-0 h-12 items-center justify-center rounded-md-full w-12 mx-auto',
        icon: 'w-6 h-6',
        okButton: 'block px-4 py-2 text-white transition duration-100 ease-in-out border border-transparent rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs',
        buttons: 'p-3 flex space-x-4 justify-center bg-gray-100 rounded-md-b'
      },
      classes: {
        close: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        closeIcon: 'fill-current h-4 w-4',
        overlay: 'bg-black',
        wrapper: 'z-50 max-w-lg px-3 py-12',
        dialog: 'bg-white shadow rounded-md text-left',
        body: 'p-3 space-y-3',
        buttons: 'bg-gray-100',
        iconWrapper: 'bg-gray-100',
        icon: 'text-gray-500',
        content: 'w-full flex justify-center flex-col',
        titleWrapper: '',
        title: 'text-lg font-semibold text-center',
        textWrapper: 'text-left w-full',
        text: '',
        cancelButton: 'block px-4 py-2 transition duration-100 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:border-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs',
        okButton: 'bg-blue-500 hover:bg-blue-600',
        inputWrapper: 'mt-3 flex items-center space-x-3',
        input: 'block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full',
        select: 'block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50  disabled:opacity-50 disabled:cursor-not-allowed w-full',
        radioWrapper: 'flex items-center space-x-2',
        radio: 'text-blue-500 transition duration-100 ease-in-out border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed',
        radioText: '',
        checkboxWrapper: 'flex items-center space-x-2',
        checkbox: 'text-blue-500 transition duration-100 ease-in-out border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed',
        checkboxText: '',
        errorMessage: 'text-red-500 block text-sm',
        busyWrapper: 'absolute bg-opacity-50 bg-white flex h-full items-center justify-center left-0 top-0 w-full',
        busyIcon: 'animate-spin h-6 w-6 fill-current text-gray-500',
        overlayEnterClass: '',
        overlayEnterActiveClass: 'opacity-0 transition ease-out duration-100',
        overlayEnterToClass: 'opacity-100',
        overlayLeaveClass: 'transition ease-in opacity-100',
        overlayLeaveActiveClass: '',
        overlayLeaveToClass: 'opacity-0 duration-75',
        enterClass: '',
        enterActiveClass: '',
        enterToClass: '',
        leaveClass: '',
        leaveActiveClass: '',
        leaveToClass: ''
      },
      variants: {
        danger: {
          overlay: 'bg-red-100',
          okButton: 'bg-red-500 hover:bg-red-600',
          iconWrapper: 'bg-red-50',
          buttons: 'bg-red-50',
          icon: 'text-red-500'
        },
        horizontal: {
          body: 'p-3 flex space-x-3',
          title: 'text-lg font-semibold'
        }
      }
    }
  },
  't-table': {
    component: TTable,
    props: {
      classes: {
        table: 'min-w-full divide-y divide-gray-100 shadow-sm border-black border-2',
        thead: '',
        theadTr: '',
        theadTh: 'px-3 py-2 font-bold text-xl text-left text-white bg-indigo-800 border-b',
        tbody: 'bg-gray-300 font-semibold divide-y divide-gray-100',
        tr: '',
        td: 'px-3 py-4 whitespace-no-wrap',
        tfoot: '',
        tfootTr: '',
        tfootTd: ''
      },
      variants: {
        thin: {
          td: 'p-1 whitespace-no-wrap text-sm',
          theadTh: 'p-1 font-semibold text-left bg-gray-100 border-b text-sm'
        }
      }
    }
  },
  't-pagination': {
    component: TPagination,
    props: {
      classes: {
        wrapper: 'table border-collapse text-center bg-white mx-auto shadow-sm',
        element: 'w-8 h-8 border border-gray-200 table-cell hover:border-blue-100',
        activeElement: 'w-8 h-8 border border-gray-200 border-blue-500 table-cell hover:border-blue-600',
        disabledElement: 'w-8 h-8 border border-gray-200 table-cell',
        ellipsisElement: 'w-8 h-8 border border-gray-200 hidden md:table-cell',
        activeButton: 'bg-blue-500 w-full h-full text-white hover:bg-blue-600 transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
        disabledButton: 'opacity-25 w-full h-full cursor-not-allowed transition duration-100 ease-in-out',
        button: 'hover:bg-blue-100 w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
        ellipsis: ''
      },
      variants: {
        rounded: {
          wrapper: 'bg-white mx-auto text-center flex space-x-2',
          element: 'w-8 h-8 rounded-md-full',
          activeElement: 'w-8 h-8 rounded-md-full',
          disabledElement: 'w-8 h-8 rounded-md-full',
          ellipsisElement: 'w-8 h-8 rounded-md-full hidden md:inline',
          activeButton: 'border border-blue-500 bg-blue-500 w-full h-full rounded-md-full text-white hover:bg-blue-600 transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
          disabledButton: 'border border-gray-200  opacity-25 w-full h-full rounded-md-full cursor-not-allowed transition duration-100 ease-in-out',
          button: 'border border-gray-200 hover:bg-blue-100 hover:border-blue-100 rounded-md-full w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
          ellipsis: ''
        }
      }
    }
  },
  't-dropdown': {
    component: TDropdown,
    props: {
      fixedClasses: {
        button: 'flex items-center text-white block px-4 py-2 transition duration-100 ease-in-out border border-transparent rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
        wrapper: 'inline-flex flex-col',
        dropdownWrapper: 'relative z-10',
        dropdown: 'origin-top-left absolute left-0 w-56 rounded-md shadow mt-1',
        enterClass: '',
        enterActiveClass: 'transition ease-out duration-100 transform opacity-0 scale-95',
        enterToClass: 'transform opacity-100 scale-100',
        leaveClass: 'transition ease-in transform opacity-100 scale-100',
        leaveActiveClass: '',
        leaveToClass: 'transform opacity-0 scale-95 duration-75'
      },
      classes: {
        button: 'bg-gray-600 px-12 hover:bg-gray-500 text-white text-sm font-semibold py-4 px-4 border border-black rounded shadow mr-4',
        dropdown: 'rounded-md absolute bg-nkayellow w-32 text-lg font-bold'
      },
      variants: {
        danger: {
          button: 'bg-red-500 hover:bg-red-600',
          dropdown: 'bg-red-50'
        }
      }
    }
  }
}

Vue.use(VueTailwind, settings);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');