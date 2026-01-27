// --- FLOW.JS --- GESTIONE SEQUENZA ESPERIMENTO

const EXPERIMENT_SEQUENCE = [
    // --- STEP 0: ANAGRAFICA ---
    { file: 'anagrafica.html', phase: 'ANAGRAFICA', context: 0, label: 'Dati Anagrafici' },
    
    // --- FASE 1 ---
    { file: 'kss.html', phase: 'PRE', context: 1, label: 'KSS Pre-Test' },
    { file: 'gvas.html', phase: 'PRE', context: 1, label: 'GVAS Pre-Test' },
    
    { file: 'task_instruction.html', phase: 'INSTR', context: 1, label: 'Istruzioni Compito' },
    { file: 'task_manager.html', phase: 'TASK', context: 1, label: 'Esecuzione Compiti' },
    
    { file: 'kss.html', phase: 'POST', context: 1, label: 'KSS Post-Test' },
    { file: 'gvas.html', phase: 'POST', context: 1, label: 'GVAS Post-Test' },
    { file: 'vds.html', phase: 'POST', context: 1, label: 'VDS Post-Test' },

    // --- PAUSA ---
    { file: 'instruction.html', phase: 'INFO', context: 0, label: 'Fine Fase 1' },
    { file: 'pause.html', phase: 'PAUSE', context: 0, label: 'Pausa & Munsell 1' },

    // --- FASE 2 ---
    { file: 'kss.html', phase: 'PRE', context: 2, label: 'KSS Pre-Test' },
    { file: 'gvas.html', phase: 'PRE', context: 2, label: 'GVAS Pre-Test' },
    
    { file: 'task_instruction.html', phase: 'INSTR', context: 2, label: 'Istruzioni Compito' },
    { file: 'task_manager.html', phase: 'TASK', context: 2, label: 'Esecuzione Compiti' },
    
    { file: 'kss.html', phase: 'POST', context: 2, label: 'KSS Post-Test' },
    { file: 'gvas.html', phase: 'POST', context: 2, label: 'GVAS Post-Test' },
    { file: 'vds.html', phase: 'POST', context: 2, label: 'VDS Post-Test' },

    // --- CONCLUSIONE ---
    { file: 'instruction2.html', phase: 'INFO', context: 0, label: 'Conclusione Test' },
    { file: 'interview.html', phase: 'INT', context: 0, label: 'Intervista Finale' },
    
    // --- MUNSELL FASE 2 ---
    { file: 'munsell_fase2.html', phase: 'MUNSELL2', context: 0, label: 'Munsell Fase 2' },

    // --- FINE ---
    { file: 'end.html', phase: 'END', context: 0, label: 'Fine' }
];


function getCurrentLightName() {
    const stepIndex = parseInt(localStorage.getItem('stepIndex') || 0);
    const step = EXPERIMENT_SEQUENCE[stepIndex];
    if (!step || step.context === 0) return "Generico"; 
    if (step.context === 1) return localStorage.getItem('light1_name');
    if (step.context === 2) return localStorage.getItem('light2_name');
    return "ND";
}

function initPage() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () { history.go(1); };

    const stepIndex = parseInt(localStorage.getItem('stepIndex') || 0);
    if (stepIndex < 0) return; 

    if (stepIndex >= EXPERIMENT_SEQUENCE.length && !window.location.href.includes('end.html')) {
        window.location.replace('end.html');
        return;
    }

    const step = EXPERIMENT_SEQUENCE[stepIndex];
    const titleEl = document.getElementById('dynamic-title');
    const subtitleEl = document.getElementById('dynamic-subtitle');
    
    if (titleEl && step) {
        titleEl.innerText = step.label;
        if(subtitleEl) { subtitleEl.innerText = ""; subtitleEl.style.display = "none"; }
    }
}

function nextStep() {
    let stepIndex = parseInt(localStorage.getItem('stepIndex') || 0);
    stepIndex++;
    localStorage.setItem('stepIndex', stepIndex);

    if (stepIndex >= EXPERIMENT_SEQUENCE.length) {
        window.location.replace('end.html');
        return;
    }
    window.location.replace(EXPERIMENT_SEQUENCE[stepIndex].file);
}

document.addEventListener('DOMContentLoaded', initPage);