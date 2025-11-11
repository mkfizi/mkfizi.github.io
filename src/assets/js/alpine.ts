import type { Alpine } from '@astrojs/alpinejs';
import anchor from '@alpinejs/anchor';
import focus from '@alpinejs/focus';
import persist from '@alpinejs/persist';

export default (Alpine: Alpine) => {
    Alpine.plugin(anchor);
    Alpine.plugin(focus);
    Alpine.plugin(persist);
    Alpine.data('app', () => ({
        init() {
            console.log("Initialize");
        } 
    }));
}
