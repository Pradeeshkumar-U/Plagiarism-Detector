// Plagiarism Detector Dashboard Core Logic

// 1. DATABASE & INITIAL STATE
const INITIAL_FILES = [
    { id: 0, name: "sorting_analysis_report.pdf", engine: "PyPDF2", chars: 4620, content: "We implement Quicksort using a divide-and-conquer paradigm. In this experiment, we analyze Quicksort's worst-case time complexity of O(n^2), which occurs when the array is already sorted and the pivot selection is poor (e.g., choosing the first or last element). To mitigate this, a randomized pivot or median-of-three selection is utilized. Space complexity remains O(log n) due to recursive stack depth. Auxiliary arrays are avoided to ensure in-place sorting. Comparison with Merge Sort reveals that Quicksort, despite its poor worst-case, has a faster constant factor in practice, making it the preferred general-purpose sorting algorithm. However, Merge Sort is stable and guarantees O(n log n) runtime." },
    { id: 1, name: "sorting_final_submission.pdf", engine: "OCR (Tesseract)", chars: 4580, content: "In this laboratory report, we focus on Quicksort implementation under the divide-and-conquer strategy. The algorithm partitions an array based on a pivot element. We evaluate the performance on sorted, reverse-sorted, and random arrays. The worst-case is O(N^2) when the array is sorted and the pivot is the smallest or largest element. To fix this, we apply median-of-three pivot selection, achieving O(N log N) on average. Stack frames require O(log N) space. Quicksort runs faster than Merge Sort due to cache locality and smaller constants, though Merge Sort offers stability and a worst-case of O(N log N)." },
    { id: 2, name: "sorting_final_v2_copied.pdf", engine: "OCR (Tesseract)", chars: 4550, content: "In this laboratory report, we focus on Quicksort implementation under the divide-and-conquer strategy. The algorithm partitions an array based on a pivot element. We evaluate the performance on sorted, reverse-sorted, and random arrays. The worst-case is O(N^2) when the array is sorted and the pivot is the smallest or largest element. To fix this, we apply median-of-three pivot selection, achieving O(N log N) on average. Stack frames require O(log N) space. Quicksort runs faster than Merge Sort due to cache locality and smaller constants, though Merge Sort offers stability and a worst-case of O(N log N). Additionally, we implement bubble sort for baseline metrics." },
    { id: 3, name: "data_structures_hw1.pdf", engine: "PyPDF2", chars: 2840, content: "Data structures are fundamental building blocks of computer science. This homework covers arrays, linked lists, stacks, and queues. Arrays provide constant-time indexing O(1) but linear insertion O(N). Singly linked lists allow dynamic sizing with O(1) insertion at the head, though searching requires scanning all nodes, resulting in O(N) complexity. Stacks operate under LIFO (Last In First Out), whereas Queues operate under FIFO (First In First Out). These structures form the foundation for complex algorithms such as graphs and trees." },
    { id: 4, name: "ai_search_agents.pdf", engine: "PyPDF2", chars: 5120, content: "Artificial Intelligence search algorithms find paths from initial states to goal states. Uninformed search techniques like Breadth-First Search (BFS) and Depth-First Search (DFS) explore states without domain knowledge. BFS guarantees completeness and optimality if edge costs are uniform, but consumes O(b^d) memory. DFS has lower memory requirements O(bd) but is not complete and may get stuck in infinite loops. Informed search algorithms utilize heuristics. A* Search uses f(n) = g(n) + h(n), where g(n) is the path cost and h(n) is the heuristic estimate of cost to goal. If h(n) is admissible, A* is optimal." },
    { id: 5, name: "heuristics_pathfinding.pdf", engine: "PyPDF2", chars: 4980, content: "This paper investigates pathfinding in grid environments. We focus on search agents exploring routes. BFS and DFS represent uninformed searches. BFS is optimal for uniform steps, but memory space complexity is O(b^d), limiting its real-world use. DFS uses less memory but is incomplete in infinite graphs. Heuristic pathfinding uses prior knowledge. A* algorithm combines actual path distance g(n) with heuristic cost h(n). If the heuristic never overestimates the true remaining distance, A* guarantees the shortest path. We evaluate Manhattan and Euclidean distance heuristics." },
    { id: 6, name: "dynamic_programming_knapsack.pdf", engine: "PyPDF2", chars: 3950, content: "The Knapsack Problem is a classic optimization problem. Given a set of items, each with a weight and a value, determine the number of items to include in a collection so that the total weight is less than a limit and the total value is maximized. The 0/1 Knapsack problem does not allow fractional items. We implement dynamic programming to solve this in O(N*W) time, where N is the item count and W is the capacity. We build a 2D table where DP[i][w] represents the maximum value using first i items with weight limit w. This dynamic grid ensures we avoid overlapping subproblems." },
    { id: 7, name: "knapsack_greedy_comparison.pdf", engine: "PyPDF2", chars: 4120, content: "This assignment explores the 0/1 Knapsack Problem. Given items with specific weights and values, our goal is to select a subset that fits in a capacity limit while maximizing value. The 0/1 variation restricts items to binary choices (either selected or not). Dynamic programming builds a table where grid cell DP[i][w] holds the maximum value for the first i items under weight constraint w, executing in O(N*W) time complexity. We compare this with a greedy approximation approach which selects items based on value-to-weight ratio. The greedy algorithm fails to find the optimal solution for 0/1 knapsack but is optimal for the fractional knapsack variant." },
    { id: 8, name: "greedy_algorithms_v2.pdf", engine: "PyPDF2", chars: 3100, content: "Greedy algorithms make locally optimal choices at each stage in hopes of finding a global optimum. Typical applications include Huffman coding, Prim's minimum spanning tree, and Dijkstra's shortest path. In the fractional knapsack problem, sorting items by value-per-unit weight and greedily picking them yields an optimal solution. However, this strategy fails for the 0/1 knapsack problem, where dynamic programming is required to evaluate subproblems. We demonstrate how greedy choices lead to sub-optimal configurations." },
    { id: 9, name: "operating_systems_virtual_memory.pdf", engine: "PyPDF2", chars: 5900, content: "Virtual memory decouples the programmer's view of memory from physical RAM. The operating system utilizes paging to map virtual addresses to physical frames. Page tables translate these references. When a requested page is not in RAM, a page fault occurs, prompting the OS to fetch the page from secondary storage. Page replacement algorithms (like LRU, FIFO, and Optimal) determine which frame is evicted. Least Recently Used (LRU) evicts pages untouched for the longest time, which is approximated using reference bits." },
    { id: 10, name: "os_memory_paging_lab.pdf", engine: "OCR (Tesseract)", chars: 5740, content: "Virtual memory divides program space into virtual pages, mapping them to physical frames in RAM. The MMU handles address translation using page tables. A page fault is triggered when a page is missing from main memory. We implement a simulation comparing page replacement schemes: First-In-First-Out, Least Recently Used, and Optimal. LRU tracks page usage history to evict the page unreferenced for the longest duration. Paging prevents fragmentation but introduces translation lookaside buffer (TLB) overheads." },
    { id: 11, name: "graph_theory_assignment.pdf", engine: "PyPDF2", chars: 3220, content: "Graphs consist of vertices connected by edges. We study representation methods: adjacency matrices and adjacency lists. Adjacency lists require O(V+E) memory, making them ideal for sparse graphs. Adjacency matrices require O(V^2) space, which is efficient for dense graphs. Graph traversal algorithms include DFS (Depth-First Search) and BFS (Breadth-First Search). We analyze connectivity, cycles, and shortest paths in directed acyclic graphs (DAGs). Dijkstra's algorithm solves single-source shortest path problems in O(E log V) with priority queues." }
];

// 12x12 Pairwise Similarity Matrix (derived from TF-IDF Cosine Similarity)
let similarityMatrix = [
    // 0     1     2     3     4     5     6     7     8     9     10    11
    [1.00, 0.53, 0.52, 0.12, 0.08, 0.07, 0.05, 0.04, 0.06, 0.03, 0.03, 0.08], // 0
    [0.53, 1.00, 0.95, 0.09, 0.06, 0.08, 0.04, 0.06, 0.04, 0.02, 0.05, 0.05], // 1
    [0.52, 0.95, 1.00, 0.10, 0.07, 0.08, 0.05, 0.07, 0.05, 0.03, 0.06, 0.06], // 2
    [0.12, 0.09, 0.10, 1.00, 0.14, 0.13, 0.15, 0.12, 0.11, 0.18, 0.14, 0.22], // 3
    [0.08, 0.06, 0.07, 0.14, 1.00, 0.65, 0.10, 0.11, 0.16, 0.09, 0.08, 0.24], // 4
    [0.07, 0.08, 0.08, 0.13, 0.65, 1.00, 0.08, 0.09, 0.14, 0.07, 0.08, 0.20], // 5
    [0.05, 0.04, 0.05, 0.15, 0.10, 0.08, 1.00, 0.81, 0.44, 0.12, 0.09, 0.11], // 6
    [0.04, 0.06, 0.07, 0.12, 0.11, 0.09, 0.81, 1.00, 0.48, 0.11, 0.08, 0.10], // 7
    [0.06, 0.04, 0.05, 0.11, 0.16, 0.14, 0.44, 0.48, 1.00, 0.08, 0.07, 0.14], // 8
    [0.03, 0.02, 0.03, 0.18, 0.09, 0.07, 0.12, 0.11, 0.08, 1.00, 0.68, 0.12], // 9
    [0.03, 0.05, 0.06, 0.14, 0.08, 0.08, 0.09, 0.08, 0.07, 0.68, 1.00, 0.10], // 10
    [0.08, 0.05, 0.06, 0.22, 0.24, 0.20, 0.11, 0.10, 0.14, 0.12, 0.10, 1.00]  // 11
];

let filesList = [...INITIAL_FILES];
let plagiarismThreshold = 80; // percent
let scanQueue = [
    { name: "dynamic_programming_knapsack_v2.pdf", size: "2.4 MB" },
    { name: "neural_networks_hw2.pdf", size: "3.1 MB" },
    { name: "operating_systems_virtual_memory_copy.pdf", size: "1.8 MB" },
    { name: "sql_queries_join_exercises.pdf", size: "840 KB" },
    { name: "searching_binary_trees.pdf", size: "1.2 MB" },
    { name: "sorting_methods_redone.pdf", size: "2.0 MB" }
];

// 2. DOM ELEMENT CACHE
const DOM = {
    navButtons: document.querySelectorAll('.nav-item'),
    panels: document.querySelectorAll('.view-panel'),
    thresholdSlider: document.getElementById('threshold-slider'),
    thresholdVal: document.getElementById('threshold-val-display'),
    heatmapContainer: document.getElementById('similarity-heatmap'),
    suspiciousList: document.getElementById('suspicious-pairs-list'),
    flaggedBadge: document.getElementById('flagged-badge'),
    
    // Metrics
    metricTotalFiles: document.getElementById('val-total-files'),
    metricFlaggedCount: document.getElementById('val-flagged-count'),
    metricAvgSimilarity: document.getElementById('val-avg-similarity'),
    metricOcrFiles: document.getElementById('val-ocr-files'),
    
    // Comparison Tab
    selectDoc1: document.getElementById('compare-doc1'),
    selectDoc2: document.getElementById('compare-doc2'),
    compareScorePill: document.getElementById('comparison-score-pill'),
    compareScoreVal: document.getElementById('compare-score-val'),
    doc1Title: document.getElementById('doc1-title'),
    doc2Title: document.getElementById('doc2-title'),
    doc1Chars: document.getElementById('doc1-chars'),
    doc2Chars: document.getElementById('doc2-chars'),
    doc2Engine: document.getElementById('doc2-engine-badge'),
    doc1TextArea: document.getElementById('doc1-text-area'),
    doc2TextArea: document.getElementById('doc2-text-area'),
    exportReportBtn: document.getElementById('export-report-btn'),
    
    // Scan Tab
    dropzone: document.getElementById('dropzone'),
    fileInput: document.getElementById('file-upload-input'),
    queuedCount: document.getElementById('queued-count'),
    queueList: document.getElementById('queue-files-list'),
    clearQueueBtn: document.getElementById('clear-queue-btn'),
    runScanBtn: document.getElementById('run-scan-trigger'),
    consoleOutput: document.getElementById('console-output'),
    consoleScanBadge: document.getElementById('console-scanning-badge'),
    clearConsoleBtn: document.getElementById('clear-console-btn'),
    headerScanBtn: document.getElementById('header-scan-btn'),
    
    // OCR Tab
    paramOtsu: document.getElementById('param-otsu'),
    valOtsu: document.getElementById('val-otsu'),
    paramDenoise: document.getElementById('param-denoise'),
    valDenoise: document.getElementById('val-denoise'),
    paramUpscale: document.getElementById('param-upscale'),
    valUpscale: document.getElementById('val-upscale'),
    applyOcrBtn: document.getElementById('apply-ocr-btn'),
    sliderContainer: document.getElementById('comparison-slider-container'),
    preprocessedSide: document.getElementById('preprocessed-side'),
    sliderHandle: document.getElementById('slider-handle'),
    toastContainer: document.getElementById('toast-container')
};

// 3. PAGE NAVIGATION
function initNavigation() {
    DOM.navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Make action buttons redirect to tabs
    DOM.headerScanBtn.addEventListener('click', () => switchTab('scan'));
}

function switchTab(tabId) {
    DOM.navButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    DOM.panels.forEach(panel => {
        if (panel.id === `view-${tabId}`) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
}

// 4. TOAST NOTIFICATION UTILITY
function showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-check-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    if (type === 'error') icon = 'fa-times-circle';
    
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;
    
    DOM.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fade-slide-in 0.3s reverse forwards';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// 5. METRIC COMPUTATIONS
function updateDashboardMetrics() {
    DOM.metricTotalFiles.textContent = filesList.length;
    
    // Count pairs exceeding active threshold
    let flaggedCount = 0;
    let totalSimilarity = 0;
    let comparisonCount = 0;

    for (let i = 0; i < filesList.length; i++) {
        for (let j = i + 1; j < filesList.length; j++) {
            const similarity = similarityMatrix[i][j] * 100;
            if (similarity >= plagiarismThreshold) {
                flaggedCount++;
            }
            totalSimilarity += similarity;
            comparisonCount++;
        }
    }

    DOM.metricFlaggedCount.textContent = flaggedCount;
    DOM.flaggedBadge.textContent = `${flaggedCount} Pair${flaggedCount === 1 ? '' : 's'}`;
    
    const avgScore = comparisonCount > 0 ? (totalSimilarity / comparisonCount).toFixed(1) : 0;
    DOM.metricAvgSimilarity.textContent = `${avgScore}%`;

    const ocrCount = filesList.filter(f => f.engine.includes('OCR')).length;
    DOM.metricOcrFiles.textContent = ocrCount;
}

// 6. RENDER INTERACTIVE SIMILARITY HEATMAP
function renderHeatmap() {
    const N = filesList.length;
    DOM.heatmapContainer.innerHTML = '';
    
    // Set grid columns
    DOM.heatmapContainer.style.gridTemplateColumns = `120px repeat(${N}, 1fr)`;
    
    // Corner header cell
    const corner = document.createElement('div');
    corner.className = 'heatmap-label';
    DOM.heatmapContainer.appendChild(corner);
    
    // Column headers (rotated text)
    for (let i = 0; i < N; i++) {
        const colHeader = document.createElement('div');
        colHeader.className = 'heatmap-label col';
        colHeader.textContent = filesList[i].name;
        colHeader.title = filesList[i].name;
        DOM.heatmapContainer.appendChild(colHeader);
    }
    
    // Rows
    for (let r = 0; r < N; r++) {
        // Row Label
        const rowLabel = document.createElement('div');
        rowLabel.className = 'heatmap-label row';
        rowLabel.textContent = filesList[r].name;
        rowLabel.title = filesList[r].name;
        DOM.heatmapContainer.appendChild(rowLabel);
        
        // Cells
        for (let c = 0; c < N; c++) {
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            
            const value = similarityMatrix[r][c];
            const percent = (value * 100).toFixed(0);
            
            cell.textContent = percent + '%';
            cell.title = `${filesList[r].name} vs ${filesList[c].name}: ${percent}%`;
            
            // Color grading
            if (r === c) {
                cell.style.background = 'rgba(255, 255, 255, 0.05)';
                cell.style.color = 'var(--text-muted)';
                cell.style.border = '1px solid rgba(255,255,255,0.05)';
                cell.style.cursor = 'default';
            } else {
                const pctVal = value * 100;
                if (pctVal >= plagiarismThreshold) {
                    // Critical alarm color
                    const factor = (pctVal - 50) / 50; // map 50-100 to 0-1
                    cell.style.background = `rgba(239, 68, 68, ${0.4 + factor * 0.55})`;
                    cell.style.border = '1px solid rgba(239, 68, 68, 0.7)';
                    cell.style.color = '#ffffff';
                } else if (pctVal >= 50) {
                    // Warning color
                    cell.style.background = 'rgba(245, 158, 11, 0.35)';
                    cell.style.border = '1px solid rgba(245, 158, 11, 0.5)';
                    cell.style.color = '#fffbeb';
                } else {
                    // Low similarity
                    cell.style.background = 'rgba(99, 102, 241, 0.1)';
                    cell.style.border = '1px solid rgba(99, 102, 241, 0.2)';
                    cell.style.color = 'var(--text-secondary)';
                }
                
                // Add click listener to open in comparison inspect tab
                cell.addEventListener('click', () => {
                    openPairwiseComparison(r, c);
                });
            }
            
            DOM.heatmapContainer.appendChild(cell);
        }
    }
}

// 7. RENDER SUSPICIOUS PAIRS LIST
function renderSuspiciousList() {
    DOM.suspiciousList.innerHTML = '';
    const suspiciousPairs = [];

    for (let i = 0; i < filesList.length; i++) {
        for (let j = i + 1; j < filesList.length; j++) {
            const similarity = similarityMatrix[i][j] * 100;
            if (similarity >= plagiarismThreshold) {
                suspiciousPairs.push({
                    idx1: i,
                    idx2: j,
                    doc1: filesList[i].name,
                    doc2: filesList[j].name,
                    score: similarity
                });
            }
        }
    }

    // Sort by descending score
    suspiciousPairs.sort((a, b) => b.score - a.score);

    if (suspiciousPairs.length === 0) {
        DOM.suspiciousList.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fa-solid fa-square-check" style="font-size: 2.5rem; color: var(--color-success); margin-bottom: 12px;"></i>
                <p>No major plagiarism detected.</p>
                <p style="font-size: 0.8rem; margin-top: 4px;">Try lowering the threshold slider.</p>
            </div>
        `;
        return;
    }

    suspiciousPairs.forEach(pair => {
        const card = document.createElement('div');
        card.className = 'suspicious-card';
        card.innerHTML = `
            <div class="card-docs">
                <span class="doc-name-pair">${pair.doc1}</span>
                <span class="doc-name-pair"><i class="fa-solid fa-link"></i> ${pair.doc2}</span>
            </div>
            <div class="pair-score">
                <span class="score-badge">${pair.score.toFixed(1)}%</span>
                <span class="pair-action">Inspect <i class="fa-solid fa-chevron-right"></i></span>
            </div>
        `;
        card.addEventListener('click', () => {
            openPairwiseComparison(pair.idx1, pair.idx2);
        });
        DOM.suspiciousList.appendChild(card);
    });
}

// 8. PAIRWISE COMPARISON LOGIC
function populateCompareDropdowns() {
    DOM.selectDoc1.innerHTML = '';
    DOM.selectDoc2.innerHTML = '';
    
    filesList.forEach((file, index) => {
        const opt1 = document.createElement('option');
        opt1.value = index;
        opt1.textContent = file.name;
        DOM.selectDoc1.appendChild(opt1);

        const opt2 = document.createElement('option');
        opt2.value = index;
        opt2.textContent = file.name;
        // Default select second file
        if (index === 1) opt2.selected = true;
        DOM.selectDoc2.appendChild(opt2);
    });
}

function openPairwiseComparison(idx1, idx2) {
    DOM.selectDoc1.value = idx1;
    DOM.selectDoc2.value = idx2;
    updateComparisonView();
    switchTab('compare');
}

function updateComparisonView() {
    const idx1 = parseInt(DOM.selectDoc1.value);
    const idx2 = parseInt(DOM.selectDoc2.value);

    if (isNaN(idx1) || isNaN(idx2)) return;

    const doc1 = filesList[idx1];
    const doc2 = filesList[idx2];

    DOM.doc1Title.textContent = doc1.name;
    DOM.doc2Title.textContent = doc2.name;
    DOM.doc1Chars.textContent = `${doc1.chars.toLocaleString()} chars`;
    DOM.doc2Chars.textContent = `${doc2.chars.toLocaleString()} chars`;
    
    // Update labels
    const d2Badge = DOM.doc2Engine;
    d2Badge.textContent = doc2.engine;
    if (doc2.engine.includes('OCR')) {
        d2Badge.className = 'pill-badge orange';
    } else {
        d2Badge.className = 'pill-badge blue';
    }

    const similarity = similarityMatrix[idx1][idx2] * 100;
    DOM.compareScoreVal.textContent = `${similarity.toFixed(1)}%`;
    
    // Adjust colors of match badge
    DOM.compareScorePill.className = 'comparison-stat-pill';
    if (similarity >= plagiarismThreshold) {
        DOM.compareScorePill.classList.add('red-bg');
    } else if (similarity >= 50) {
        DOM.compareScorePill.classList.add('yellow-bg');
    } else {
        DOM.compareScorePill.classList.add('green-bg');
    }

    // Render highlights
    if (similarity >= 50 && idx1 !== idx2) {
        // If similarity is high, mock-inject matching highlights
        const commonPhrases = [
            "divide-and-conquer", 
            "analyze Quicksort's worst-case time complexity of O(n^2)", 
            "already sorted and the pivot selection is poor", 
            "median-of-three selection", 
            "runs faster than Merge Sort due to cache locality and smaller constants", 
            "Merge Sort offers stability and a worst-case of O(N log N)",
            "Knapsack Problem",
            "weights and values",
            "DP[i][w] represents the maximum value",
            "virtual memory divides program space into virtual pages",
            "page replacement algorithms",
            "Least Recently Used",
            "unreferenced for the longest duration"
        ];

        let text1 = doc1.content;
        let text2 = doc2.content;

        commonPhrases.forEach(phrase => {
            // Case insensitive match
            const regex = new RegExp(`(${phrase})`, 'gi');
            text1 = text1.replace(regex, '<span class="highlight-plagiarised" title="Matching sequence detected">$1</span>');
            text2 = text2.replace(regex, '<span class="highlight-plagiarised" title="Matching sequence detected">$1</span>');
        });

        DOM.doc1TextArea.innerHTML = `<p>${text1}</p>`;
        DOM.doc2TextArea.innerHTML = `<p>${text2}</p>`;
    } else {
        DOM.doc1TextArea.innerHTML = `<p>${doc1.content}</p>`;
        DOM.doc2TextArea.innerHTML = `<p>${doc2.content}</p>`;
    }
}

// 9. SCANNING WORKSPACE SIMULATION
function renderQueue() {
    DOM.queuedCount.textContent = scanQueue.length;
    DOM.queueList.innerHTML = '';

    if (scanQueue.length === 0) {
        DOM.queueList.innerHTML = `
            <div style="text-align:center; color:var(--text-muted); font-size:0.75rem; padding: 20px;">
                Queue empty. Add PDFs to analyze.
            </div>
        `;
        return;
    }

    scanQueue.forEach((file, index) => {
        const card = document.createElement('div');
        card.className = 'queue-file-card';
        card.innerHTML = `
            <div class="file-info-group">
                <i class="fa-regular fa-file-pdf"></i>
                <span class="queue-file-name" title="${file.name}">${file.name}</span>
                <span class="queue-file-size">${file.size}</span>
            </div>
            <button class="remove-queue-btn" data-index="${index}"><i class="fa-solid fa-times"></i></button>
        `;
        DOM.queueList.appendChild(card);
    });

    // Add remove listeners
    document.querySelectorAll('.remove-queue-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.getAttribute('data-index'));
            scanQueue.splice(index, 1);
            renderQueue();
            showToast("File removed from queue", "warning");
        });
    });
}

function handleDragAndDrop() {
    DOM.dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        DOM.dropzone.classList.add('dragover');
    });

    DOM.dropzone.addEventListener('dragleave', () => {
        DOM.dropzone.classList.remove('dragover');
    });

    DOM.dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        DOM.dropzone.classList.remove('dragover');
        
        const files = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith('.pdf'));
        if (files.length > 0) {
            files.forEach(f => {
                scanQueue.push({
                    name: f.name,
                    size: (f.size / (1024 * 1024)).toFixed(1) + " MB"
                });
            });
            renderQueue();
            showToast(`Added ${files.length} PDFs to scan queue`);
        } else {
            showToast("Please drop PDF files only", "error");
        }
    });

    // File input browse click
    DOM.fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files).filter(f => f.name.endsWith('.pdf'));
        if (files.length > 0) {
            files.forEach(f => {
                scanQueue.push({
                    name: f.name,
                    size: (f.size / (1024 * 1024)).toFixed(1) + " MB"
                });
            });
            renderQueue();
            showToast(`Added ${files.length} PDFs to scan queue`);
        }
    });
}

function runPlagiarismScanSimulation() {
    if (scanQueue.length === 0) {
        showToast("No files in queue to scan", "error");
        return;
    }

    DOM.runScanBtn.disabled = true;
    DOM.consoleScanBadge.classList.remove('hide');
    
    // Clear terminal log
    DOM.consoleOutput.innerHTML = '<div class="console-line system">&gt;&gt; Initializing AuraCheck Scanner Engine...</div>';

    const logLines = [
        { text: "Scanning submissions/ directory...", type: "system", delay: 800 },
        { text: `Found ${scanQueue.length} files in queue. Reading PDF bytes...`, type: "system", delay: 1400 },
        { text: "[STEP 1/5] Extracting digital text layers using PyPDF2...", type: "step", delay: 2000 },
        { text: `✔ parsed: dynamic_programming_knapsack_v2.pdf (4,010 characters)`, type: "success", delay: 2600 },
        { text: `✔ parsed: neural_networks_hw2.pdf (5,210 characters)`, type: "success", delay: 3200 },
        { text: `⚠ parsed: operating_systems_virtual_memory_copy.pdf - 0 characters extracted. Empty text layers detected.`, type: "warning", delay: 4000 },
        { text: "[STEP 2/5] Initializing OpenCV OCR Preprocessing Pipeline...", type: "step", delay: 4600 },
        { text: `→ Grayscale conversion successful...`, type: "system", delay: 5000 },
        { text: `→ Executing FastNL Denoising (strength=10)... Denoising completed in 324ms.`, type: "system", delay: 5500 },
        { text: `→ Applying Otsu Binarization... High contrast black & white image produced.`, type: "system", delay: 6000 },
        { text: "[STEP 3/5] Executing PyTesseract OCR Engine...", type: "step", delay: 6500 },
        { text: `→ Running OCR on 4 pages of operating_systems_virtual_memory_copy.pdf...`, type: "system", delay: 7200 },
        { text: `✔ Tesseract completed. Extracted 5,880 characters of handwritten text layers.`, type: "success", delay: 8500 },
        { text: `✔ parsed: sql_queries_join_exercises.pdf (2,980 characters)`, type: "success", delay: 9000 },
        { text: "[STEP 4/5] Fitting TF-IDF Vectorizer and building document frequency models...", type: "step", delay: 9600 },
        { text: `→ Vocab Matrix built. Dimensions: [18 x 5,204 unique terms]`, type: "system", delay: 10400 },
        { text: "[STEP 5/5] Computing pairwise Cosine Similarities...", type: "step", delay: 11000 },
        { text: "✔ Generating analysis matrix results...", type: "success", delay: 11500 },
        { text: `[SUCCESS] Output saved to: plagiarism_results.csv`, type: "success", delay: 12000 },
        { text: `[SUCCESS] Summary appended. Process completed.`, type: "success", delay: 12400 }
    ];

    logLines.forEach(line => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = `console-line ${line.type}`;
            div.textContent = `>> ${line.text}`;
            DOM.consoleOutput.appendChild(div);
            // Scroll to bottom
            DOM.consoleOutput.scrollTop = DOM.consoleOutput.scrollHeight;
        }, line.delay);
    });

    // End simulation
    setTimeout(() => {
        DOM.runScanBtn.disabled = false;
        DOM.consoleScanBadge.classList.add('hide');

        // Merge queue items into database
        const newFiles = [
            { id: 12, name: "operating_systems_virtual_memory_copy.pdf", engine: "OCR (Tesseract)", chars: 5880, content: "Virtual memory decouples the programmer's view of memory from physical RAM. The operating system utilizes paging to map virtual addresses to physical frames. Page tables translate these references. When a requested page is not in RAM, a page fault occurs, prompting the OS to fetch the page from secondary storage. Page replacement algorithms (like LRU, FIFO, and Optimal) determine which frame is evicted. Least Recently Used (LRU) evicts pages untouched for the longest time, which is approximated using reference bits." },
            { id: 13, name: "dynamic_programming_knapsack_v2.pdf", engine: "PyPDF2", chars: 4010, content: "The Knapsack Problem is a classic optimization problem. Given a set of items, each with a weight and a value, determine the number of items to include in a collection so that the total weight is less than a limit and the total value is maximized. The 0/1 Knapsack problem does not allow fractional items. We implement dynamic programming to solve this in O(N*W) time, where N is the item count and W is the capacity. We build a 2D table where DP[i][w] represents the maximum value." }
        ];

        // Append to files list
        filesList.push(...newFiles);

        // Update Matrix with 2 new elements (14x14)
        // Set operating_systems_virtual_memory_copy.pdf vs operating_systems_virtual_memory.pdf -> 97.4% similarity
        // Set dynamic_programming_knapsack_v2.pdf vs dynamic_programming_knapsack.pdf -> 92.5% similarity
        const currentLength = filesList.length;
        
        // Expand existing rows in matrix
        similarityMatrix.forEach(row => {
            while (row.length < currentLength) row.push(0.04);
        });

        // Add 2 new rows
        const row12 = new Array(currentLength).fill(0.05);
        row12[12] = 1.00; // self
        row12[9] = 0.97; // virtual memory copy vs original
        row12[10] = 0.65; // vs paging lab
        similarityMatrix.push(row12);

        const row13 = new Array(currentLength).fill(0.04);
        row13[13] = 1.00; // self
        row13[6] = 0.92; // knapsack copy vs original
        row13[7] = 0.78; // vs greedy compare
        similarityMatrix.push(row13);

        // Make symmetric
        similarityMatrix[9][12] = 0.97;
        similarityMatrix[10][12] = 0.65;
        similarityMatrix[6][13] = 0.92;
        similarityMatrix[7][13] = 0.78;

        // Clear queue
        scanQueue = [];
        renderQueue();

        // Update all UI elements
        updateDashboardMetrics();
        renderHeatmap();
        renderSuspiciousList();
        populateCompareDropdowns();
        
        showToast("Analysis complete! 2 high-similarity matches detected.", "warning", 5000);
    }, 12800);
}

// 10. OCR PIPELINE CONFIGURATION & BEFORE/AFTER COMPASS SLIDER
function initOcrTabControls() {
    DOM.paramOtsu.addEventListener('input', (e) => {
        DOM.valOtsu.textContent = e.target.value;
    });

    DOM.paramDenoise.addEventListener('input', (e) => {
        DOM.valDenoise.textContent = e.target.value;
    });

    DOM.paramUpscale.addEventListener('input', (e) => {
        DOM.valUpscale.textContent = e.target.value + "x";
    });

    DOM.applyOcrBtn.addEventListener('click', () => {
        showToast("OpenCV parameters successfully applied!");
    });
}

function initSliderComparison() {
    let isDragging = false;

    const drag = (e) => {
        if (!isDragging) return;
        const rect = DOM.sliderContainer.getBoundingClientRect();
        let x = e.clientX - rect.left;
        
        // Boundaries
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        
        const percentage = (x / rect.width) * 100;
        DOM.preprocessedSide.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        DOM.sliderHandle.style.left = `${percentage}%`;
    };

    DOM.sliderContainer.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    DOM.sliderContainer.addEventListener('mousemove', drag);
    
    // Touch support for mobiles
    const dragTouch = (e) => {
        if (!isDragging) return;
        const rect = DOM.sliderContainer.getBoundingClientRect();
        let x = e.touches[0].clientX - rect.left;
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        const percentage = (x / rect.width) * 100;
        DOM.preprocessedSide.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        DOM.sliderHandle.style.left = `${percentage}%`;
    };
    DOM.sliderContainer.addEventListener('touchstart', () => { isDragging = true; });
    window.addEventListener('touchend', () => { isDragging = false; });
    DOM.sliderContainer.addEventListener('touchmove', dragTouch);
}

// 11. INITIALIZATION & EVENTS
document.addEventListener('DOMContentLoaded', () => {
    // Nav
    initNavigation();

    // Threshold Slider
    DOM.thresholdSlider.addEventListener('input', (e) => {
        plagiarismThreshold = parseInt(e.target.value);
        DOM.thresholdVal.textContent = `${plagiarismThreshold}%`;
        
        // Dynamically update UI
        updateDashboardMetrics();
        renderHeatmap();
        renderSuspiciousList();
    });

    // Comparison select bindings
    DOM.selectDoc1.addEventListener('change', updateComparisonView);
    DOM.selectDoc2.addEventListener('change', updateComparisonView);

    DOM.exportReportBtn.addEventListener('click', () => {
        showToast("Generating PDF Report... Plagiarism check details downloaded.");
    });

    // Scan buttons
    DOM.clearQueueBtn.addEventListener('click', () => {
        scanQueue = [];
        renderQueue();
        showToast("Queue cleared", "warning");
    });

    DOM.clearConsoleBtn.addEventListener('click', () => {
        DOM.consoleOutput.innerHTML = '<div class="console-line system">&gt;&gt; Console log cleared. Ready.</div>';
    });

    DOM.runScanBtn.addEventListener('click', runPlagiarismScanSimulation);

    // OCR components
    initOcrTabControls();
    initSliderComparison();
    handleDragAndDrop();

    // Initial renders
    updateDashboardMetrics();
    renderHeatmap();
    renderSuspiciousList();
    populateCompareDropdowns();
    updateComparisonView();
    renderQueue();
});
