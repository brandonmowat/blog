/**
 *
 * @param {KeyboardEvent} e
 */
export const handleSaveKeyboardShortcut = (e, action) =>  {
    if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        e.stopPropagation();

        action()
    }
}
      