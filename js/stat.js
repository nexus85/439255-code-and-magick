'use strict';

window.renderStatistics = function (ctx, names, times) {
  var background = {
    initialX: 100,
    initialY: 10,
    height: 270,
    width: 420,
    shadowOffset: 10,
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    scroll: {
      wood: {
        height: 5,
        width: 40,
        get offset() {
          return (background.scroll.paper.width - background.scroll.wood.width) / 2;
        },
        get gradientStartX() {
          return background.initialX + background.scroll.wood.offset;
        }
      },
      paper: {
        width: 60,
        get height() {
          return background.height - background.scroll.wood.height * 2;
        }
      },
      list: {
        color: 'rgba(255, 255, 255, 1)'
      }
    }
  };

  background.scroll.paper.color = ctx.createLinearGradient(background.initialX, background.initialY,
      background.initialX + background.scroll.paper.width, background.initialY);
  background.scroll.paper.color.addColorStop(0, 'gray');
  background.scroll.paper.color.addColorStop(0.3, 'rgba(255, 255, 255, 1)');
  background.scroll.paper.color.addColorStop(0.35, 'rgba(255, 255, 255, 1)');
  background.scroll.paper.color.addColorStop(0.8, 'gray');
  background.scroll.paper.color.addColorStop(1, 'black');

  background.scroll.wood.color = ctx.createLinearGradient(background.scroll.wood.gradientStartX, background.initialY,
      background.scroll.wood.gradientStartX + background.scroll.wood.width, background.initialY);
  background.scroll.wood.color.addColorStop(0, 'rgba(77, 31, 6, 1)');
  background.scroll.wood.color.addColorStop(0.35, 'rgba(140, 52, 19, 1)');
  background.scroll.wood.color.addColorStop(0.4, 'rgba(140, 52, 19, 1)');
  background.scroll.wood.color.addColorStop(1, 'rgba(77, 31, 6, 1)');
  var title = {
    initialX: background.initialX + background.scroll.paper.width,
    initialY: background.initialY + background.scroll.wood.height,
    height: 60,
    color: 'rgba(0, 0, 0, 1)',
    font: '16px PT Mono',
    lineOneText: 'Ура вы победили!',
    lineOneOffsetX: 110,
    lineOneOffsetY: 25,
    lineTwoText: 'Список результатов:',
    lineTwoOffsetX: 90,
    lineTwoOffsetY: 49
  };
  var histogram = {
    get initialX() {
      return background.initialX + background.scroll.paper.width + this.startIndent;
    },
    initialY: background.initialY + background.scroll.wood.height + title.height,
    get startIndent() {
      return (background.width - background.scroll.paper.width - this.length) / 2;
    },
    get length() {
      return this.barWidth * names.length + this.indent * (names.length - 1);
    },
    get stepX() {
      return this.barWidth + this.indent;
    },
    get stepY() {
      return this.height / window.util.getMaxNumber(times);
    },
    height: 150,
    textFont: '16px PT Mono',
    textColor: 'rgba(0, 0, 0, 1)',
    textLineHeight: 20,
    textOffsetX: 5,
    textOffsetY: 10,
    barWidth: 40,
    indent: 50,
    userBarColor: 'rgba(255, 0, 0, 1)',
    drawBar: function (value, i) {
      ctx.font = histogram.textFont;
      ctx.fillStyle = histogram.textColor;
      ctx.fillText(Math.round(value).toString(10),
          histogram.initialX + histogram.stepX * i,
          histogram.initialY + histogram.textLineHeight + (histogram.height - value * histogram.stepY) - histogram.textOffsetY);
      ctx.fillStyle = names[i] === 'Вы' ? histogram.userBarColor : window.util.getRandomColor('0', '0', '255');
      ctx.fillRect(histogram.initialX + histogram.stepX * i,
          histogram.initialY + histogram.textLineHeight + (histogram.height - value * histogram.stepY),
          histogram.barWidth,
          value * histogram.stepY);
      ctx.fillStyle = histogram.textColor;
      ctx.font = histogram.textColor;
      ctx.fillText(names[i],
          histogram.initialX + histogram.stepX * i + histogram.textOffsetX,
          histogram.initialY + histogram.height + histogram.textLineHeight * 2);
    }
  };
  ctx.fillStyle = background.shadowColor;
  ctx.fillRect(background.initialX + background.shadowOffset,
      background.initialY + background.scroll.wood.height + background.shadowOffset,
      background.width,
      background.scroll.paper.height);
  ctx.fillRect(background.initialX + background.scroll.wood.offset + background.shadowOffset,
      background.initialY + background.scroll.paper.height + background.scroll.wood.height + background.shadowOffset,
      background.scroll.wood.width,
      background.scroll.wood.height);

  ctx.fillStyle = background.scroll.wood.color;
  ctx.strokeRect(background.initialX + background.scroll.wood.offset,
      background.initialY,
      background.scroll.wood.width,
      background.scroll.wood.height);
  ctx.strokeRect(background.initialX + background.scroll.wood.offset,
      background.initialY + background.scroll.wood.height + background.scroll.paper.height,
      background.scroll.wood.width,
      background.scroll.wood.height);
  ctx.fillRect(background.initialX + background.scroll.wood.offset,
      background.initialY,
      background.scroll.wood.width,
      background.scroll.wood.height);
  ctx.fillRect(background.initialX + background.scroll.wood.offset,
      background.initialY + background.scroll.wood.height + background.scroll.paper.height,
      background.scroll.wood.width,
      background.scroll.wood.height);

  ctx.fillStyle = background.scroll.paper.color;
  ctx.strokeRect(background.initialX,
      background.initialY + background.scroll.wood.height,
      background.width,
      background.scroll.paper.height);
  ctx.fillRect(background.initialX,
      background.initialY + background.scroll.wood.height,
      background.scroll.paper.width,
      background.scroll.paper.height);

  ctx.fillStyle = background.scroll.list.color;
  ctx.fillRect(background.initialX + background.scroll.paper.width,
      background.initialY + background.scroll.wood.height,
      background.width - background.scroll.paper.width,
      background.scroll.paper.height);

  ctx.fillStyle = title.color;
  ctx.font = title.font;
  ctx.fillText(title.lineOneText, title.initialX + title.lineOneOffsetX, title.initialY + title.lineOneOffsetY);
  ctx.fillText(title.lineTwoText, title.initialX + title.lineTwoOffsetX, title.initialY + title.lineTwoOffsetY);

  times.forEach(histogram.drawBar);
};
