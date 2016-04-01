
import {TableDiff} from "./tableDiff";
import {Params} from '../app';

interface Fraction {
    n;
    d;
}

interface BesselStep {
    result: number;
    last: BesselStepLast;
}

interface BesselStepLast {
    begin: Fraction;
    end: Fraction;
}

/**
 * Bessel polynomial interpolation
 */
export class Bessel {
    /** размер шага */
    h: number;
    /** число точек интерполяции */
    n: number;
    /** таблица симметричных разностей */
    table: TableDiff;
    a;
    b;

    /** @var Function функция, возвращающая нужный элемент из таблицы разностей */
    delta: (k) => number;

    constructor(func: (x) => number, params: Params) {
        this.n = params.n;
        this.a = params.a;
        this.b = params.b;
        this.h = (params.b - params.a) / (2 * params.n + 2);
        console.log("h = " + this.h);
        this.table = new TableDiff(func, params.a, this.h, 2 * this.n + 2);
        //this.table.print();
        this.delta = (k) => this.table.getFirstDelta(k);
    }

    bessel(x: number): number {
        let result = 0;
        let last = {
            begin: 1,
            end: 1
        };
        let step;

        if (Math.abs(x) < 0.00001) {
            console.log(x);
        }

        //for (let i = this.a, b = this.b, num = 0; i < b; i += (this.b - this.a) / 1000, num++) {
        for (let i = 0; i < this.n; i++) {
            //console.log(i);
            step = this.bessel_step(last, (x - this.a) / this.h, i, i);
            result += step.result;
            last = step.last;

            /*if (Math.abs(i) < 0.0001) {
                console.log(last.begin, last.end);
            }*/
        }

        return result;
    }

    /**
     * begin =  t·(t−1)(t+1)·...·(t−(n−1))·(t+(n−1))·(t−n) / (2n)!
     * end =    t·(t−1)(t+1)·...·(t−(n−1))·(t+(n−1))·(t−n)·(t−1/2) / (2n+1)!
     * @param last
     * @param t
     * @param n узел интерполяции
     * @param step
     * @returns {Object}
     */
    bessel_step(last, t: number, n: number, step): BesselStep {
        let num,
            begin = last.begin,
            end = last.end;

        t = (t - this.a) / this.h;

        if (step == 0) {
            begin = 1;
            end = t - 1 / 2;
        } else if (step == 1) {
            begin *= t * (t - 1);
            end *= t * (t - 1);
        } else {
            num = (t - n) * (t + n);
            begin *= num / begin * (2 * n);
            end *= num / (2 * n + 1);
        }

        return {
            result: begin * this.delta(2 * n) + end * this.delta(2 * n + 1),
            last: {
                begin,
                end,
            }
        };
    }

    /*bessel_step(last: BesselStepLast, t: number, n: number, step): BesselStep {
     let num,
     begin = last.begin,
     end = last.end;

     if (step == 0) {
     begin = {n: 1, d: 1};
     end =   {n: t - 1 / 2, d: 1};
     } else if (step == 1) {
     begin = {n: begin.n * t * (t - 1), d: 1};
     end   = {n: end.n * t * (t - 1), d: 1};
     } else {
     num = (t - n) * (t + n);
     begin = {n: begin.n * num, d: begin.d * (2 * n)};
     end   = {n: end.n * num,   d: end.d * (2 * n + 1)};
     }

     return {
     result: begin.n / begin.d * this.delta(2 * n) + end.n / end.d * this.delta(2 * n + 1),
     last: {
     begin,
     end,
     }
     };
     }*/

    /**
     * Return t(t-1)(t+1)...(t-n-1)(t+n-1)(t-n)(t + n - 1)
     * @param t
     * @param n
     * @returns number
     */
    static calc_t(t: number, n: number) {
        let c = t;
        for (let i = 1; i < n; i++) {
            c *= t - i;
            c *= t + i;
        }
        return c * (t - n) * (t + n - 1);
    }

    static factorial(n: number) {
        let c = 1;
        for (let i = 1; i <= n; i++) {
            c *= i;
        }
        return c;
    }
}