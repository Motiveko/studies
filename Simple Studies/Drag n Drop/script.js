const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    // 이거 해줘야 커서 금지표시가 해제된다.
    e.preventDefault();

    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (!afterElement) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
    // .dragging은 딱 한개만 존재한다.
  });
});

function getDragAfterElement(container, y) {
  // :not()을 이용해서 현재 드래그중인것은 선택하지 않는다.
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      // box의 사각형
      const box = child.getBoundingClientRect();

      const offset = y - box.top - box.height / 2;
      // offset이 음수면 이 요소의 중간은 dragging보다 밑에 있다.
      // 그 중 가장 0에 근접한 offset을 찾는다.(dragging 바로아래요소)
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
}
