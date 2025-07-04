import { signInPath } from "@/paths";
import { signOutUser } from "@/services/user-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signOut, isPending } = useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate(signInPath());
    },
  });

  return { signOut, isPending };
};
