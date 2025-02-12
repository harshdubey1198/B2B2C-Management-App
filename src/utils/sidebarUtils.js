export const triggerSidebarUpdateForRole = (role) => {
    // 🔥 First Trigger
    window.dispatchEvent(new CustomEvent("sidebarUpdatedForRole", { detail: { role } }));
    console.log("🔄 Sidebar updated for role:", role);

    // 🔥 Second Trigger (immediately)
    window.dispatchEvent(new CustomEvent("sidebarUpdatedForRole", { detail: { role } }));
    console.log("🔄 Sidebar updated again for role:", role);
};
