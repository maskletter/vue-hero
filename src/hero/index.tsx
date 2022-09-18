import { defineComponent, onMounted, cloneVNode, ref, onBeforeUnmount } from 'vue'

const heroMap = new Map();
const getScrollTop = () => document.documentElement.scrollTop || document.body.scrollTop;
const getOffset = (el: HTMLDivElement) => {
    const scrollTop = getScrollTop();
    const { left, top } = el.getBoundingClientRect();
    return {
        left, top: top + scrollTop
    }
}

export const Hero = defineComponent((props: any, ctx) => {
    const $root = ref();
    let isFirst = ref(false)
    let currentHero = heroMap.get(props.k);
    const loadSuccess = ref(!currentHero ? true : false);
    const setElementStyle = (el: HTMLDivElement, styles: Record<string, string | number>) => {
        for(const key in styles) {
            el.style[key as any] = styles[key] as any
        }
        return el;
    }
    if (currentHero) {
        // 防止进入页面时候两个组件同时存在导致获取异常
        if (!currentHero.$first) return
        const offset = getOffset(currentHero.$first);
        const { left, top } = offset;
        const div = setElementStyle(currentHero.$first.cloneNode(true), {
           left: `${left}px`,
           top: `${top}px`,
           position: 'absolute',
           transition: `${currentHero.duration}s all ${currentHero.timing}`,
           zIndex: currentHero.zIndex,
        });
        currentHero.$first.style.opacity = 0;
        document.body.appendChild(div)
        currentHero.transHeroEl = div;
        currentHero.firstOffset = offset;
        const fn = () => {
            currentHero.transHeroEl.style.display = 'none';
            loadSuccess.value = true;
            currentHero.transHeroEl.removeEventListener('transitionend', fn, false)
        }
        currentHero.transHeroEl.addEventListener('transitionend', fn, false)
    } else {
        heroMap.set(props.k, currentHero = {
            duration: props.duration ? props.duration / 1000 : 0.6,
            zIndex: props.zIndex || 999,
            timing: props.timing || 'ease'
        })
        isFirst.value = true;
    }
    const diffStyle = (el, styles, updateStyles) => {
        for(const key in styles) {
            if (updateStyles[key]) {
                el.style[key] = updateStyles[key]
            } else {
                el.style[key] = ''
            }
        }
    }
    onMounted(() => {
        if (!currentHero.$first) {
            currentHero.$first = $root.value
        } else {
            // 防止进入页面时候两个组件同时存在导致获取异常
            if (!currentHero.$first) return
            currentHero.$last = $root.value;
            // 拷贝目标元素对象，并对目标元素设置初始元素位置以及大小
            const newEl = setElementStyle(currentHero.$last.cloneNode(true), {
                left: `${currentHero.firstOffset.left}px`,
                top: `${currentHero.firstOffset.top}px`,
                position: 'absolute',
                transition: `${currentHero.duration}s all ${currentHero.timing}`,
                zIndex: currentHero.zIndex + 1,
                opacity: 0,
            })
            currentHero.transHeroElLast = newEl;
            diffStyle(newEl, currentHero.lastStyles, currentHero.firstStyles)
            document.body.appendChild(newEl);
            const fn = () => {
                newEl.style.display = 'none'
                newEl.removeEventListener('transitionend', fn, false)
            }
            newEl.addEventListener('transitionend', fn, false);
            // 异步设置初始元素想目标元素偏移动画
            setTimeout(() => {
                const { left, top } = getOffset(currentHero.$last);
                setElementStyle(currentHero.transHeroEl, {
                    left: `${left}px`,
                    top: `${top}px`,
                    opacity: 0
                })
                setElementStyle(newEl, {
                    left: `${left}px`,
                    top: `${top}px`,
                    opacity: 1,
                })
                for(const key in currentHero.lastStyles) {
                    currentHero.transHeroEl.style[key] = currentHero.lastStyles[key]
                    newEl.style[key as any] = currentHero.lastStyles[key]
                }
            }, 10)
        }
    })
    onBeforeUnmount(() => {
        if (!currentHero) {
            return;
        }
        if (!currentHero.$last) {
            heroMap.delete(props.k);
            return;
        }
        let { transHeroEl, transHeroElLast, $last, $first, lastStyles, firstStyles } = currentHero;
        // 防止页面元素尺寸位置发生变化，从新获取赋值
        const { left, top } = getOffset($last);
        setElementStyle(transHeroEl, {
            left: `${left}px`,
            top: `${top}px`,
            display: 'block',
        })
        setElementStyle(transHeroElLast, {
            left: `${left}px`,
            top: `${top}px`,
            display: 'block',
        })
        transHeroEl.addEventListener('transitionend', () => {
            if (!transHeroEl) return;
            document.body.removeChild(transHeroEl);
            document.body.removeChild(transHeroElLast);
            transHeroElLast = undefined;
            currentHero.$last = transHeroElLast = transHeroEl = undefined;
            $first.style.opacity = 1;
        })
        // 避免display:block/none导致没有触发动画，添加异步处理
        setTimeout(() => {
            const { left, top } = getOffset($first);
            setElementStyle(transHeroEl, {
                left: `${left}px`,
                top: `${top}px`,
                opacity: 1,
            })
            setElementStyle(transHeroElLast, {
                left: `${left}px`,
                top: `${top}px`,
                opacity: 0
            })
            diffStyle(transHeroEl, lastStyles, firstStyles)
            diffStyle(transHeroElLast, lastStyles, firstStyles)
        })

    })
    return () => {
        if (!ctx.slots.default) return
        const [child] = ctx.slots.default();
        if (isFirst.value) {
            currentHero.firstStyles = child?.props?.style || {};
        } else {
            currentHero.lastStyles = child?.props?.style || {};
        }
        return cloneVNode(child, {
            ref: $root,
            style: {
                ...child?.props?.style,
                opacity: loadSuccess.value ? 1 : 0
            }
        });
    }
})
Hero.props = {
    k: String,
    duration: Number,
    zIndex: Number,
    timing: String
}