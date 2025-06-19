// Documentation search functionality
class DocumentationSearch {
    constructor() {
        this.searchInputs = document.querySelectorAll('.docs-search');
        this.searchableContent = [];
        this.currentResults = [];
        this.init();
    }

    init() {
        this.indexContent();
        this.setupEventListeners();
    }

    indexContent() {
        // Index all headings and their content
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        headings.forEach(heading => {
            const headingText = heading.textContent.trim();
            const headingLevel = parseInt(heading.tagName.substring(1));
            
            // Get the content following this heading until the next heading of same or higher level
            let content = '';
            let currentElement = heading.nextElementSibling;
            
            while (currentElement) {
                const nextHeading = currentElement.querySelector('h1, h2, h3, h4, h5, h6');
                const isHeading = currentElement.matches('h1, h2, h3, h4, h5, h6');
                
                if (isHeading) {
                    const nextLevel = parseInt(currentElement.tagName.substring(1));
                    if (nextLevel <= headingLevel) break;
                }
                
                if (nextHeading) {
                    const nextLevel = parseInt(nextHeading.tagName.substring(1));
                    if (nextLevel <= headingLevel) break;
                }
                
                // Extract text content, excluding script and style elements
                const textContent = this.getTextContent(currentElement);
                if (textContent) {
                    content += ' ' + textContent;
                }
                
                currentElement = currentElement.nextElementSibling;
            }

            // Create search index entry
            this.searchableContent.push({
                title: headingText,
                content: content.trim(),
                element: heading,
                level: headingLevel,
                url: window.location.pathname + '#' + (heading.id || this.generateId(headingText))
            });
        });

        // Also index navigation items
        const navItems = document.querySelectorAll('.docs-nav a');
        navItems.forEach(link => {
            this.searchableContent.push({
                title: link.textContent.trim(),
                content: 'Navigation: ' + link.textContent.trim(),
                element: link,
                level: 0,
                url: link.href,
                isNavigation: true
            });
        });
    }

    getTextContent(element) {
        // Clone the element to avoid modifying the original
        const clone = element.cloneNode(true);
        
        // Remove script and style elements
        const scriptsAndStyles = clone.querySelectorAll('script, style');
        scriptsAndStyles.forEach(el => el.remove());
        
        // Get text content and clean it up
        let text = clone.textContent || clone.innerText || '';
        
        // Clean up extra whitespace
        text = text.replace(/\s+/g, ' ').trim();
        
        return text;
    }

    generateId(text) {
        return text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
    }

    setupEventListeners() {
        this.searchInputs.forEach(input => {
            input.addEventListener('input', this.debounce((e) => {
                this.performSearch(e.target.value);
            }, 300));

            input.addEventListener('focus', () => {
                this.showSearchResults();
            });

            input.addEventListener('keydown', (e) => {
                this.handleKeyNavigation(e);
            });
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSearchResults();
            }
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    performSearch(query) {
        if (!query || query.length < 2) {
            this.hideSearchResults();
            return;
        }

        const normalizedQuery = query.toLowerCase();
        const results = [];

        this.searchableContent.forEach(item => {
            let score = 0;
            const titleMatch = item.title.toLowerCase().includes(normalizedQuery);
            const contentMatch = item.content.toLowerCase().includes(normalizedQuery);

            if (titleMatch) {
                score += item.title.toLowerCase().indexOf(normalizedQuery) === 0 ? 10 : 5;
            }
            if (contentMatch) {
                score += 1;
            }

            if (score > 0) {
                results.push({
                    ...item,
                    score,
                    titleMatch,
                    contentMatch
                });
            }
        });

        // Sort by score (highest first)
        results.sort((a, b) => b.score - a.score);
        
        // Limit results
        this.currentResults = results.slice(0, 8);
        this.displaySearchResults(this.currentResults, query);
    }

    displaySearchResults(results, query) {
        this.searchInputs.forEach(input => {
            let container = input.parentElement.querySelector('.search-results');
            
            if (!container) {
                container = document.createElement('div');
                container.className = 'search-results';
                input.parentElement.appendChild(container);
            }

            if (results.length === 0) {
                container.innerHTML = `
                    <div class="search-result-item no-results">
                        <div class="search-result-title">No results found</div>
                        <div class="search-result-content">Try different keywords</div>
                    </div>
                `;
            } else {
                container.innerHTML = results.map((result, index) => `
                    <div class="search-result-item ${index === 0 ? 'highlighted' : ''}" data-url="${result.url}">
                        <div class="search-result-title">
                            ${this.highlightText(result.title, query)}
                            ${result.isNavigation ? '<span class="nav-badge">Navigation</span>' : ''}
                        </div>
                        <div class="search-result-content">
                            ${this.highlightText(this.truncateText(result.content, 100), query)}
                        </div>
                    </div>
                `).join('');

                // Add click handlers to results
                container.querySelectorAll('.search-result-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const url = item.dataset.url;
                        if (url) {
                            window.location.href = url;
                        }
                    });
                });
            }

            container.style.display = 'block';
        });
    }

    highlightText(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        
        const truncated = text.substring(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');
        
        return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '...';
    }

    showSearchResults() {
        this.searchInputs.forEach(input => {
            const container = input.parentElement.querySelector('.search-results');
            if (container && this.currentResults.length > 0) {
                container.style.display = 'block';
            }
        });
    }

    hideSearchResults() {
        this.searchInputs.forEach(input => {
            const container = input.parentElement.querySelector('.search-results');
            if (container) {
                container.style.display = 'none';
            }
        });
    }

    handleKeyNavigation(e) {
        const container = e.target.parentElement.querySelector('.search-results');
        if (!container || container.style.display === 'none') return;

        const items = container.querySelectorAll('.search-result-item:not(.no-results)');
        const highlighted = container.querySelector('.search-result-item.highlighted');
        
        let currentIndex = highlighted ? Array.from(items).indexOf(highlighted) : -1;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                currentIndex = Math.min(currentIndex + 1, items.length - 1);
                this.updateHighlight(items, currentIndex);
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                currentIndex = Math.max(currentIndex - 1, 0);
                this.updateHighlight(items, currentIndex);
                break;
                
            case 'Enter':
                e.preventDefault();
                if (highlighted) {
                    highlighted.click();
                }
                break;
                
            case 'Escape':
                this.hideSearchResults();
                e.target.blur();
                break;
        }
    }

    updateHighlight(items, index) {
        items.forEach((item, i) => {
            item.classList.toggle('highlighted', i === index);
        });
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DocumentationSearch();
});

// CSS for search results (injected via JavaScript)
const searchStyles = `
.search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #2a2a2a;
    border: 1px solid #444;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    max-height: 400px;
    overflow-y: auto;
    display: none;
}

.search-result-item {
    padding: 12px 16px;
    border-bottom: 1px solid #444;
    cursor: pointer;
    transition: background-color 0.2s;
}

.search-result-item:last-child {
    border-bottom: none;
}

.search-result-item:hover,
.search-result-item.highlighted {
    background-color: #333;
}

.search-result-item.no-results {
    cursor: default;
    color: #888;
}

.search-result-title {
    font-weight: bold;
    color: #C5B358;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.search-result-content {
    color: #ccc;
    font-size: 14px;
    line-height: 1.4;
}

.nav-badge {
    background: #444;
    color: #888;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: normal;
}

.search-result-item mark {
    background-color: #C5B358;
    color: #000;
    padding: 1px 2px;
    border-radius: 2px;
}

.docs-search {
    position: relative;
}

.docs-sidebar {
    position: relative;
}

.search-results::-webkit-scrollbar {
    width: 6px;
}

.search-results::-webkit-scrollbar-track {
    background: #1a1a1a;
}

.search-results::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 3px;
}

.search-results::-webkit-scrollbar-thumb:hover {
    background: #666;
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = searchStyles;
document.head.appendChild(styleSheet);