
/**
 * Таблица симметричных разностей
 */
export class TableDiff {
    x = [];
    y = [];
    delta: number[][] = [];
    start: number;

    /**
     * Конструктор
     * @param func функция
     * @param start пределы
     * @param h шаг
     * @param n максималный порядок конечн разности
     */
    constructor(func: (x: number) => number, start, h, n) {
        if (h <= 0) {
            throw new Error('h <= 0');
        }
        this.start = start;
        for (let i = 0; i <= n; i++) {
            //let x = i;
            let x = start + h * i; // ???
            this.x.push(x);
            this.y.push(func(x));
        }

        let {y} = this;
        for (let i = 0; i < n; i++) {
            this.delta.push([]);

            if (i == 0) {
                for (let k = 0, len = y.length - 1; k < len; k++) {
                    this.delta[i].push(y[k + 1] - y[k]);
                }
                continue;
            }

            for (let k = 0, len = y.length - i - 1; k < len; k++) {
                this.delta[i].push(this.delta[i - 1][k + 1] - this.delta[i - 1][k]);
            }
        }
    }

    /**
     * Возвращает значение вида Δ^k*y_p
     * @param k
     * @param p
     * @returns {number}
     */
    getDelta(k, p) {
        console.log(`get delta ${k} ${-this.start + k}`);
        if (typeof this.delta[-this.start + k] != "undefined") {
            return this.delta[-this.start + k][p];
        }
        throw new Error('get delta error');
    }

    /**
     * Возвращает значение вида Δ^k*y_n
     * k = 1/2
     * @param n
     */
    getFirstDelta(n) {
        if (typeof this.delta[n] != "undefined") {
            return this.delta[n][1] - this.delta[n][0];
        }
        throw new Error(`get delta error for n = ${n}`);
    }

    print() {
        console.table({
            x: this.x,
            y: this.y,
        });
        console.table(this.delta);
    }
}