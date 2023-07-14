import React, { FC } from "react";

export const LockIcon: FC<{ open: boolean }> = ({ open }) => {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M36.8722 26H19.1278C17.3447 26 16.6982 26.1857 16.0463 26.5343C15.3945 26.8829 14.8829 27.3945 14.5343 28.0463C14.1857 28.6982 14 29.3447 14 31.1278V42.8722C14 44.6553 14.1857 45.3018 14.5343 45.9537C14.8829 46.6055 15.3945 47.1171 16.0463 47.4657C16.6982 47.8144 17.3447 48 19.1278 48H36.8722C38.6553 48 39.3018 47.8144 39.9537 47.4657C40.6055 47.1171 41.1171 46.6055 41.4657 45.9537C41.8144 45.3018 42 44.6553 42 42.8722V31.1278C42 29.3447 41.8144 28.6982 41.4657 28.0463C41.1171 27.3945 40.6055 26.8829 39.9537 26.5343C39.3018 26.1857 38.6553 26 36.8722 26ZM28 32C29.6569 32 31 33.3432 31 35C31 36.3059 30.1656 37.4169 29.0009 37.829L29 41C29 41.5523 28.5523 42 28 42C27.4477 42 27 41.5523 27 41L27.0001 37.8293C25.8349 37.4175 25 36.3063 25 35C25 33.3432 26.3431 32 28 32Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M38.0018 23.0281C39.418 23.1065 40.3765 23.3583 41.3685 23.8888C42.5431 24.517 43.483 25.4569 44.1112 26.6315C44.7716 27.8664 45 29.0492 45 31.1278V42.8722C45 44.9508 44.7716 46.1337 44.1112 47.3685C43.483 48.5431 42.5431 49.483 41.3685 50.1112C40.1337 50.7716 38.9508 51 36.8722 51H19.1278C17.0492 51 15.8663 50.7716 14.6315 50.1112C13.4569 49.483 12.517 48.5431 11.8888 47.3685C11.2284 46.1337 11 44.9508 11 42.8722V31.1278C11 29.0492 11.2284 27.8664 11.8888 26.6315C12.517 25.4569 13.4569 24.517 14.6315 23.8888C15.6238 23.3582 16.5825 23.1064 17.9993 23.028L21 23H35L38.0018 23.0281ZM19.1278 26H36.8722C38.6553 26 39.3018 26.1857 39.9537 26.5343C40.6055 26.8829 41.1171 27.3945 41.4657 28.0463C41.8144 28.6982 42 29.3447 42 31.1278V42.8722C42 44.6553 41.8144 45.3018 41.4657 45.9537C41.1171 46.6055 40.6055 47.1171 39.9537 47.4657C39.3018 47.8144 38.6553 48 36.8722 48H19.1278C17.3447 48 16.6982 47.8144 16.0463 47.4657C15.3945 47.1171 14.8829 46.6055 14.5343 45.9537C14.1857 45.3018 14 44.6553 14 42.8722V31.1278C14 29.3447 14.1857 28.6982 14.5343 28.0463C14.8829 27.3945 15.3945 26.8829 16.0463 26.5343C16.6982 26.1857 17.3447 26 19.1278 26Z"
        fill="black"
      />
      <path
        d="M38 17C38 11.4772 33.5228 7 28 7C22.4772 7 18 11.4772 18 17V30.5H21V17C21 13.134 24.134 10 28 10C31.866 10 35 13.134 35 17V24H38V17Z"
        fill="black"
        style={{ transform: open ? "translateY(-5px)" : "", transition: "0.3s" }}
      />
    </svg>
  );
};
