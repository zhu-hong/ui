import { create } from 'zustand'

export const useKeyboardStore = create<{
  open:boolean;
  setOpen:(open: boolean)=>void;
  layoutName:'default'|'shift'|'number';
  setLayoutName:(layoutName: 'default'|'shift'|'number')=>void;
  keyboardValue:string;
  setKeyboardValue:(val: string)=>void;
  middleFunc: null|(()=>void);
  setMiddleFunc: (func: () => void)=>void;
  placement:'top'|'bottom';
  setPlacement:(placement: 'top'|'bottom')=>void;
  handleEnter: null|(()=>void);
  setHandleEnter: (func: () => void)=>void;
  point: boolean;
  setPoint:(point: boolean)=>void;
}>((set) =>  ({
    open: false,
    setOpen: (open) => set(() => {
      if(!open) {
        return {
          open,
          layoutName: 'default',
          keyboardValue: '',
          middleFunc: null,
          placement: 'top',
          handleEnter: null,
          point: false,
        }
      }
      return { open }
    }),
    keyboardValue: '',
    setKeyboardValue: (value) => set(() => ({ keyboardValue: value })),
    layoutName: 'default',
    setLayoutName: (value) => set(() => ({ layoutName: value })), 
    middleFunc: null,
    setMiddleFunc: (func) => set(() => ({ middleFunc: func })),
    placement: 'top',
    setPlacement: (position) => set(() => ({ placement: position })),
    handleEnter: null,
    setHandleEnter: (func) => set(() => ({ handleEnter: func })),
    point: false,
    setPoint: (point) => set(() => ({ point })),
  }
))