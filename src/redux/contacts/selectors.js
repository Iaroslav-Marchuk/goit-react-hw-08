import { createSelector } from "@reduxjs/toolkit";
import { selectValueFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectValueFilter],
  (contacts, valueFilter) => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(valueFilter.toLowerCase()) ||
        contact.number.includes(valueFilter)
    );
  }
);
