import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { UserProps } from "@/types";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";

interface Props {
  currentUser: UserProps | null;
  listingId: string;
}

const useFavourite = ({ currentUser, listingId }: Props) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavourited = useMemo(
    () => (currentUser?.favouriteIds || []).includes(listingId),
    [currentUser, listingId]
  );

  const toggleFavourite = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    try {
      let request;

      if (hasFavourited) {
        request = () => axios.delete(`/api/favourites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favourites/${listingId}`);
      }

      await request();

      router.refresh();

      toast.success("Success");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  }, [currentUser, listingId, hasFavourited, loginModal, router]);

  return {
    hasFavourited,
    toggleFavourite,
  };
};

export default useFavourite;
