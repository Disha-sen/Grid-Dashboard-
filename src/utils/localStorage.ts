const COLUMN_STATE_KEY = 'ag-grid-column-state';

export const saveColumnState = (columnState: any[]): void => {
  try {
    localStorage.setItem(COLUMN_STATE_KEY, JSON.stringify(columnState));
  } catch (error) {
    console.error('Failed to save column state:', error);
  }
};

export const loadColumnState = (): any[] | null => {
  try {
    const state = localStorage.getItem(COLUMN_STATE_KEY);
    return state ? JSON.parse(state) : null;
  } catch (error) {
    console.error('Failed to load column state:', error);
    return null;
  }
};

export const clearColumnState = (): void => {
  try {
    localStorage.removeItem(COLUMN_STATE_KEY);
  } catch (error) {
    console.error('Failed to clear column state:', error);
  }
};
