import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useAttendeeModals } from '../useAttendeeModals';
import attendeeListReducer from '../../../../store/slices/attendeeListSlice';

const createMockStore = () => {
  return configureStore({
    reducer: {
      attendeeList: attendeeListReducer,
    },
  });
};

describe('useAttendeeModals', () => {
  it('should initialize with modals closed', () => {
    const store = createMockStore();
    const setSelectedSlugs = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(
      () => useAttendeeModals({ selectedSlugs: [], setSelectedSlugs }),
      { wrapper },
    );

    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.isDeleteModalOpen).toBe(false);
    expect(result.current.isClearAllModalOpen).toBe(false);
    expect(result.current.isBulkDeleteModalOpen).toBe(false);
    expect(result.current.editingSlug).toBeUndefined();
  });

  it('should handle Add Modal', () => {
    const store = createMockStore();
    const setSelectedSlugs = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(
      () => useAttendeeModals({ selectedSlugs: [], setSelectedSlugs }),
      { wrapper },
    );

    act(() => {
      result.current.handlers.handleAdd();
    });

    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.editingSlug).toBeUndefined();

    act(() => {
      result.current.handlers.handleCloseModal();
    });

    expect(result.current.isModalOpen).toBe(false);
  });

  it('should handle Edit Modal', () => {
    const store = createMockStore();
    const setSelectedSlugs = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(
      () => useAttendeeModals({ selectedSlugs: [], setSelectedSlugs }),
      { wrapper },
    );

    act(() => {
      result.current.handlers.handleEdit('some-slug');
    });

    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.editingSlug).toBe('some-slug');
  });

  it('should handle Single Delete', () => {
    const store = createMockStore();
    const setSelectedSlugs = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(
      () => useAttendeeModals({ selectedSlugs: [], setSelectedSlugs }),
      { wrapper },
    );

    act(() => {
      result.current.handlers.handleDeleteClick('slug-to-delete');
    });

    expect(result.current.isDeleteModalOpen).toBe(true);

    act(() => {
      result.current.handlers.confirmDelete();
    });

    expect(result.current.isDeleteModalOpen).toBe(false);
  });

  it('should handle Clear All', () => {
    const store = createMockStore();
    const setSelectedSlugs = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(
      () => useAttendeeModals({ selectedSlugs: [], setSelectedSlugs }),
      { wrapper },
    );

    act(() => {
      result.current.handlers.handleClearAll();
    });

    expect(result.current.isClearAllModalOpen).toBe(true);

    act(() => {
      result.current.handlers.confirmClearAll();
    });

    expect(result.current.isClearAllModalOpen).toBe(false);
  });

  it('should handle Bulk Delete', () => {
    const store = createMockStore();
    const setSelectedSlugs = vi.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(
      () => useAttendeeModals({ selectedSlugs: ['s1', 's2'], setSelectedSlugs }),
      { wrapper },
    );

    act(() => {
      result.current.handlers.handleBulkDelete();
    });

    expect(result.current.isBulkDeleteModalOpen).toBe(true);

    act(() => {
      result.current.handlers.confirmBulkDelete();
    });

    expect(result.current.isBulkDeleteModalOpen).toBe(false);
    expect(setSelectedSlugs).toHaveBeenCalledWith([]);
  });
});
