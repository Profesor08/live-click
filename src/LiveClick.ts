interface ILiveClickStore {
  items: ILiveClickItem[];
}

interface ILiveClickItem {
  selector: string;
  listener: ILiveClickListener;
}

type ILiveClickListener = (event: MouseEvent, target: Element) => void;

const store: ILiveClickStore = {
  items: [],
};

const on = (selector: string, listener: ILiveClickListener) => {
  store.items.push({ selector, listener });
};

const off = (selector: string, listener: ILiveClickListener) => {
  store.items = store.items.filter(
    (item) => item.selector !== selector && item.listener !== listener,
  );
};

document.addEventListener("click", (event) => {
  store.items.forEach((item) => {
    const target =
      (event.target as Element | null)?.closest(item.selector) || null;

    if (target !== null) {
      item.listener(event, target);
    }
  });
});

export const click = {
  on,
  off,
};
