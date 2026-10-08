(function (root) {
    const retrievedAt = '2026-10-08';
    const products = [
        { id: 'start-np-complete', name: 'sango nutri-NP complete', category: 'SANGOKAI START', sizeUnit: 'ml', system: 'START', sourceUrl: 'https://sangokai.org/?page_id=4905' },
        { id: 'start-p-complex', name: 'sango nutri-P comPlex', category: 'SANGOKAI START', sizeUnit: 'ml', system: 'START', sourceUrl: 'https://sangokai.org/?page_id=7801' },
        { id: 'basis-1', name: 'sango nutri-basic #1', category: 'SANGOKAI BASIS', sizeUnit: 'ml', system: 'BASIS', sourceUrl: 'https://sangokai.org/?page_id=8593' },
        { id: 'basis-2', name: 'sango nutri-basic #2', category: 'SANGOKAI BASIS', sizeUnit: 'ml', system: 'BASIS', sourceUrl: 'https://sangokai.org/?page_id=8593' },
        { id: 'basis-3', name: 'sango nutri-basic/HED #3', category: 'SANGOKAI BASIS / HED', sizeUnit: 'ml', system: 'BASIS / HED', sourceUrl: 'https://sangokai.org/?page_id=8593' },
        { id: 'nano-basis-1', name: 'sango nutri-basic NANO #1', category: 'SANGOKAI NANO BASIS', sizeUnit: 'ml', system: 'NANO BASIS', sourceUrl: 'https://sangokai.org/?page_id=9462' },
        { id: 'nano-basis-2', name: 'sango nutri-basic NANO #2', category: 'SANGOKAI NANO BASIS', sizeUnit: 'ml', system: 'NANO BASIS', sourceUrl: 'https://sangokai.org/?page_id=9462' },
        { id: 'hed-sps-1', name: 'sango nutri-HED SPS #1', category: 'SANGOKAI HED', sizeUnit: 'ml', system: 'HED', sourceUrl: 'https://sangokai.org/?page_id=11869' },
        { id: 'hed-sps-2', name: 'sango nutri-HED SPS #2', category: 'SANGOKAI HED', sizeUnit: 'ml', system: 'HED', sourceUrl: 'https://sangokai.org/?page_id=11869' },
        { id: 'balance-ca-1', name: 'sango chem-balance Ca-1', category: 'SANGOKAI BALANCE', sizeUnit: 'ml', system: 'BALANCE', sourceUrl: 'https://sangokai.org/?page_id=5133' },
        { id: 'balance-ca-2', name: 'sango chem-balance Ca-2', category: 'SANGOKAI BALANCE', sizeUnit: 'ml', system: 'BALANCE', sourceUrl: 'https://sangokai.org/?page_id=5144' },
        { id: 'balance-kh', name: 'sango chem-balance KH', category: 'SANGOKAI BALANCE', sizeUnit: 'st', system: 'BALANCE', sourceUrl: 'https://sangokai.org/?page_id=5163' },
        ...[
            ['individual-k', 'K', 'https://sangokai.org/?page_id=8771'],
            ['individual-sr', 'Sr', 'https://sangokai.org/?page_id=9006'],
            ['individual-b', 'B', 'https://sangokai.org/?page_id=8963'],
            ['individual-brf', 'BrF', 'https://sangokai.org/?page_id=10575'],
            ['individual-if', 'IF', 'https://sangokai.org/?page_id=9031']
        ].map(([id, code, sourceUrl]) => ({ id, name: `sango chem-individual ${code}`, category: 'SANGOKAI INDIVIDUAL', sizeUnit: 'ml', system: 'INDIVIDUAL', sourceUrl })),
        { id: 'clean-anio', name: 'CLEAN anio', category: 'SANGOKAI CLEAN', sizeUnit: 'g', system: 'CLEAN', sourceUrl: 'https://sangokai.org/?page_id=6094' },
        { id: 'clean-carb', name: 'CLEAN carb', category: 'SANGOKAI CLEAN', sizeUnit: 'g', system: 'CLEAN', sourceUrl: 'https://sangokai.org/?page_id=6164' }
    ].map(product => ({ ...product, manufacturer: 'SANGOKAI', productVersion: 'laut verlinkter Herstellerseite', sourceRetrievedAt: retrievedAt }));

    root.SANGOKAI_PRODUCT_CATALOG = { manufacturer: 'SANGOKAI', sourceRetrievedAt: retrievedAt, products };
})(typeof globalThis !== 'undefined' ? globalThis : window);
