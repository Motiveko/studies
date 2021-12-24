/* eslint-disable @typescript-eslint/no-unused-vars */
const isNodeChanged = (node1: Element, node2: Element) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;
  // 속성 수가 다르다
  if (n1Attributes.length !== n2Attributes.length) {
    return true;
  }

  // 하나 이상의 속성이 변경되었다
  const differentAttribute = Array.from(n1Attributes).find(attr => {
    const { name } = attr;

    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);
    return attribute1 === attribute2;
  });

  if (differentAttribute) {
    return true;
  }

  // 노드에 자식이 없고 textContent가 다르다
  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  return false;
};

const applyDiff = (
  parentNode: Element,
  realNode: Element | undefined,
  virtualNode: Element | undefined
) => {
  // newNode만 없으면
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }
  // realNode만 없으면
  if (!realNode && virtualNode) {
    parentNode?.appendChild(virtualNode);
    return;
  }

  if (realNode && virtualNode) {
    // 노드가 바뀌었으면(isNodeChanged)
    if (isNodeChanged(realNode, virtualNode)) {
      realNode?.replaceWith(virtualNode);
      return;
    }

    // 자식노드들에 대해 Math.max 만큼 수행한다.
    const realChildren = Array.from(realNode.childNodes);
    const virtualChildren = Array.from(virtualNode.childNodes);

    const max = Math.max(realChildren.length, virtualChildren.length);

    for (let i = 0; i < max; i++) {
      applyDiff(realNode, realChildren[i] as Element, virtualChildren[i] as Element);
    }
  }
};

export default applyDiff;
