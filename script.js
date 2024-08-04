document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const speedControl = document.getElementById('speed');
    const canvas = document.getElementById('canvas');
    const algorithmSelect = document.getElementById('algorithm');
    const algorithmCode = document.getElementById('algorithmCode');

    let animationId;
    let isPaused = false;
    let speed = 50;
    let delay = 1000 / speed;

    const algorithms = {
        bubbleSort: {
            code: `function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
            visualize: function() {
                const array = [5, 3, 8, 4, 2];
                const bars = array.map((value, index) => {
                    const bar = document.createElement('div');
                    bar.className = 'bar';
                    bar.style.height = `${value * 20}px`;
                    bar.style.left = `${index * 30}px`;
                    const span = document.createElement('span');
                    span.textContent = value;
                    bar.appendChild(span);
                    canvas.appendChild(bar);
                    return bar;
                });

                let i = 0, j = 0;

                function step() {
                    if (i < array.length) {
                        if (j < array.length - i - 1) {
                            if (array[j] > array[j + 1]) {
                                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                                bars[j].style.height = `${array[j] * 20}px`;
                                bars[j + 1].style.height = `${array[j + 1] * 20}px`;
                                bars[j].firstChild.textContent = array[j];
                                bars[j + 1].firstChild.textContent = array[j + 1];
                            }
                            j++;
                        } else {
                            j = 0;
                            i++;
                        }
                        animationId = setTimeout(step, delay);
                    }
                }

                step();
            }
        },
        quickSort: {
            code: `function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const right = arr.filter(x => x > pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
}`,
            visualize: function() {
                const array = [5, 3, 8, 4, 2];
                const bars = array.map((value, index) => {
                    const bar = document.createElement('div');
                    bar.className = 'bar';
                    bar.style.height = `${value * 20}px`;
                    bar.style.left = `${index * 30}px`;
                    const span = document.createElement('span');
                    span.textContent = value;
                    bar.appendChild(span);
                    canvas.appendChild(bar);
                    return bar;
                });

                async function quickSort(arr, left = 0, right = arr.length - 1) {
                    if (left >= right) return;

                    let pivotIndex = await partition(arr, left, right);
                    await quickSort(arr, left, pivotIndex - 1);
                    await quickSort(arr, pivotIndex + 1, right);
                }

                async function partition(arr, left, right) {
                    let pivotIndex = left;
                    let pivotValue = arr[right];
                    for (let i = left; i < right; i++) {
                        if (arr[i] < pivotValue) {
                            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
                            bars[i].style.height = `${arr[i] * 20}px`;
                            bars[pivotIndex].style.height = `${arr[pivotIndex] * 20}px`;
                            bars[i].firstChild.textContent = arr[i];
                            bars[pivotIndex].firstChild.textContent = arr[pivotIndex];
                            pivotIndex++;
                            await sleep(delay);
                        }
                    }
                    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
                    bars[pivotIndex].style.height = `${arr[pivotIndex] * 20}px`;
                    bars[right].style.height = `${arr[right] * 20}px`;
                    bars[pivotIndex].firstChild.textContent = arr[pivotIndex];
                    bars[right].firstChild.textContent = arr[right];
                    await sleep(delay);
                    return pivotIndex;
                }

                function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }

                quickSort(array);
            }
        },
        bfs: {
            code: `function bfs(graph, start) {
    let queue = [start];
    let visited = new Set();
    visited.add(start);

    while (queue.length > 0) {
        let node = queue.shift();
        console.log(node); // Process node

        graph[node].forEach(neighbor => {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        });
    }
}`,
            visualize: function() {
                const graph = {
                    0: [1, 2, 3],
                    1: [0, 4, 5],
                    2: [0, 6, 7],
                    3: [0, 8, 9],
                    4: [1],
                    5: [1],
                    6: [2],
                    7: [2],
                    8: [3],
                    9: [3]
                };
                const nodes = Object.keys(graph).map(key => {
                    const node = document.createElement('div');
                    node.className = 'node';
                    node.textContent = key;
                    canvas.appendChild(node);
                    return node;
                });

                // Position the nodes on the canvas
                const positions = [
                    { top: 200, left: 200 },
                    { top: 100, left: 100 },
                    { top: 100, left: 300 },
                    { top: 300, left: 100 },
                    { top: 50, left: 50 },
                    { top: 50, left: 150 },
                    { top: 50, left: 250 },
                    { top: 50, left: 350 },
                    { top: 350, left: 50 },
                    { top: 350, left: 150 }
                ];
                nodes.forEach((node, index) => {
                    node.style.top = `${positions[index].top}px`;
                    node.style.left = `${positions[index].left}px`;
                });

                let queue = [0];
                let visited = new Set();
                visited.add(0);

                function step() {
                    if (queue.length > 0) {
                        let node = queue.shift();
                        nodes[node].classList.add('visited');
                        nodes[node].style.transform = 'scale(1.5)';
                        graph[node].forEach(neighbor => {
                            if (!visited.has(neighbor)) {
                                visited.add(neighbor);
                                queue.push(neighbor);
                            }
                        });
                        animationId = setTimeout(() => {
                            nodes[node].style.transform = 'scale(1)';
                            step();
                        }, delay);
                    }
                }

                step();
            }
        },
        dfs: {
            code: `function dfs(graph, start) {
    let stack = [start];
    let visited = new Set();
    visited.add(start);

    while (stack.length > 0) {
        let node = stack.pop();
        console.log(node); // Process node

        graph[node].forEach(neighbor => {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                stack.push(neighbor);
            }
        });
    }
}`,
            visualize: function() {
                const graph = {
                    0: [1, 2, 3],
                    1: [0, 4, 5],
                    2: [0, 6, 7],
                    3: [0, 8, 9],
                    4: [1],
                    5: [1],
                    6: [2],
                    7: [2],
                    8: [3],
                    9: [3]
                };
                const nodes = Object.keys(graph).map(key => {
                    const node = document.createElement('div');
                    node.className = 'node';
                    node.textContent = key;
                    canvas.appendChild(node);
                    return node;
                });

                // Position the nodes on the canvas
                const positions = [
                    { top: 200, left: 200 },
                    { top: 100, left: 100 },
                    { top: 100, left: 300 },
                    { top: 300, left: 100 },
                    { top: 50, left: 50 },
                    { top: 50, left: 150 },
                    { top: 50, left: 250 },
                    { top: 50, left: 350 },
                    { top: 350, left: 50 },
                    { top: 350, left: 150 }
                ];
                nodes.forEach((node, index) => {
                    node.style.top = `${positions[index].top}px`;
                    node.style.left = `${positions[index].left}px`;
                });

                let stack = [0];
                let visited = new Set();
                visited.add(0);

                function step() {
                    if (stack.length > 0) {
                        let node = stack.pop();
                        nodes[node].classList.add('visited');
                        nodes[node].style.transform = 'scale(1.5)';
                        graph[node].forEach(neighbor => {
                            if (!visited.has(neighbor)) {
                                visited.add(neighbor);
                                stack.push(neighbor);
                            }
                        });
                        animationId = setTimeout(() => {
                            nodes[node].style.transform = 'scale(1)';
                            step();
                        }, delay);
                    }
                }

                step();
            }
        }
    };

    function updateAlgorithmCode() {
        const selectedAlgorithm = algorithmSelect.value;
        algorithmCode.textContent = algorithms[selectedAlgorithm].code;
    }

    function startVisualization() {
        if (isPaused) {
            isPaused = false;
            return;
        }
        resetVisualization();
        const selectedAlgorithm = algorithmSelect.value;
        algorithms[selectedAlgorithm].visualize();
    }

    function pauseVisualization() {
        isPaused = true;
        clearTimeout(animationId);
    }

    function resetVisualization() {
        isPaused = false;
        clearTimeout(animationId);
        canvas.innerHTML = '';
    }

    algorithmSelect.addEventListener('change', updateAlgorithmCode);
    speedControl.addEventListener('input', (e) => {
        speed = e.target.value;
        delay = 1000 / speed;
    });
    startButton.addEventListener('click', startVisualization);
    pauseButton.addEventListener('click', pauseVisualization);
    resetButton.addEventListener('click', resetVisualization);

    updateAlgorithmCode();
});
