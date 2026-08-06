import useAppStore from "../store/useAppStore";

const useCurrentWorkspace = () => {
  const workspaceId = useAppStore((state) => state.workspaceId);
  return workspaceId;
};

export default useCurrentWorkspace;
