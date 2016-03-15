///<reference path="../../typings/main.d.ts"/>
import * as Snap from '../../node_modules/snapsvg/dist/snap.svg';

export class GraphPolynom {
    lineStyle = {
        stroke: '#000',
        strokeWidth: 1
    };
    lineStyle2 = {
        stroke: '#0f0',
        opacity: 0,
        strokeWidth: 10
    };
    fontAxisY = {
        fontFamily: 'Source Sans Pro',
        textAnchor: 'middle'
    };
    fontAxisX = {
        fontFamily: 'Source Sans Pro',
        textAnchor: 'middle'
    };
    padding = 60;

    paper: Snap.Paper;
    sizeSvg = [800, 600];

    start: number[] = [0, 400];
    size: number = 10;
    count: number = 10;

    func;

    extremum: number[] = [-10, 10, -10, 10, -10, 10];
    segment = 30;

    constructor(id, func) {
        this.paper = Snap(id || 'svg');
        this.func = func;

        /*let extr;
        this.extremum = extr = this.getExtremum();

        // определяем размер сегмента
        this.count = extr[5] - extr[4];
        this.size = Math.min(this.sizeSvg[0], this.sizeSvg[1]) - this.padding;
        this.segment = this.size / this.count;

        // считаем начало координат
        let x_min = extr[0],
            x_max = extr[1],
            y_min = extr[2],
            y_max = extr[3];
        let graphW = (x_max - x_min) * this.segment,
            graphH = (y_max - y_min) * this.segment;

        this.start = [
            this.sizeSvg[0] / 2 - graphW / 2 - x_min * this.segment,
            this.sizeSvg[1] / 2 - graphH / 2 + y_max * this.segment
        ];*/

        //this.drawAxis();
        //this.drawAxis(true);

        this.drawGraphics();
    }

    /**
     * Отрисовка оси координат
     * @param vert
     */
    drawAxis(vert?) {
        let paper = this.paper,
            size = this.size,
            count = this.count,
            segm = this.segment;

        let startX = this.start[0] + .5,
            startY = this.start[1] + .5,
            endX, endY;

        if (vert) {
            segm *= -1;
            endY = startY - size;
            endX = startX;
        } else {
            endX = startX + size;
            endY = startY;
        }

        let line;
        if (vert) {
            line = paper.line(
                startX, startY - this.extremum[2] * this.segment,
                startX, startY - this.extremum[3] * this.segment
            );
        } else {
            line = paper.line(
                startX + this.extremum[0] * this.segment, startY,
                startX + this.extremum[1] * this.segment, startY
            );
        }
        line.attr(this.lineStyle);

        for (let i = 0; i <= Math.min(...this.sizeSvg); i++) {
            let localX = vert ? startX : startX + i * segm;
            let localY = vert ? startY + i * segm : startY;

            if (vert) {
                if (i != 0) {
                    paper.text(localX - 15, localY + 5, "" + i)
                        .attr(this.fontAxisY);
                }
                paper.line(localX, localY, localX - 5, localY)
                    .attr(this.lineStyle);
            } else {
                if (i != 0) {
                    paper.text(localX, localY + 20, "" + i)
                        .attr(this.fontAxisX);
                }
                paper.line(localX, localY, localX, localY + 5)
                    .attr(this.lineStyle);
            }
        }
    }

    /**
     * Отрисовка графиков
     */
    drawGraphics() {
        let start = this.start,
            segment = this.segment,
            last = [0, 0];

        for (let i = -20; i < 20; i += .1) {
            let coord = [];
            coord[0] = last[0];
            coord[1] = last[1];
            let x = coord[2] = i;
            let y = coord[3] = this.func(i);

            let sign = 1;
            coord = coord.map((e, i) => {
                sign = (i % 2) ? -1 : 1; // invert axisY
                return start[i % 2] + e * segment * sign;
            });

            let line = this.paper.line(coord[0], coord[1], coord[2], coord[3])
                .attr(this.lineStyle);

            this.paper.line(coord[0], coord[1], coord[2], coord[3])
                .attr(this.lineStyle2)
                .hover((e) => {
                    line.attr({stroke: '#f00'});
                }, (e) => {
                    line.attr(this.lineStyle);
                });
            last[0] = x;
            last[1] = y;
        }
    }

    updateGraphics(func) {
        this.func = func;
        this.paper.clear();
        this.drawGraphics();
    }
}