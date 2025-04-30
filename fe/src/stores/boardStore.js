import { create } from 'zustand';

const useBoardStore = create((set) => ({
  title: '',
  content: '',
  boardImageFileList: [],

  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setBoardImageFileList: (files) => set({ boardImageFileList: files }),
  resetBoard: () => set({ title: '', content: '', boardImageFileList: [] }),
}));

export default useBoardStore;
