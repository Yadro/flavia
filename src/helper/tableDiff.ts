/**
 * Таблица конечных разностей вперёд
 */
export class TableDiff {
    x = [];
    y = [];
    delta: number[][] = [];

    /**
     *
     * @param func функция
     * @param size пределы
     * @param h шаг
     * @param n максималный порядок конечн разности
     */
    constructor(func, size: number[], h, n) {
        if (h <= 0) {
            throw new Error('h <= 0');
        }
        for (let x = size[0]; x < size[1]; x+=h) {
            this.x.push(x);
            this.y.push(func(x));
        }
        let {y} = this;

        for (let i = 0; i < n; i++) {
            this.delta.push([]);

            if (i == 0) {
                for (let k = 0, len = y.length - 1; k < len; k++) {
                    this.delta[i].push(y[k+1] - y[k]);
                }
                continue;
            }

            for (let k = 0, len = y.length - i - 1; k < len; k++) {
                this.delta[i].push(this.delta[i-1][k+1] - this.delta[i-1][k]);
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
        return this.delta[k-1][p];
    }

    toString() {
        console.table({
            x: this.x,
            y: this.y,
        });
        console.table(this.delta);
    }
}