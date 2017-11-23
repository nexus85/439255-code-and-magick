'use strict';

var getMaxNumber = function (arr) {
  return Math.max.apply(null, arr);
};

var getRandomColor = function (red, green, blue, opacity) {
  red = red || Math.floor(Math.random() * 256);
  green = green || Math.floor(Math.random() * 256);
  blue = blue || Math.floor(Math.random() * 256);
  opacity = opacity || Math.ceil((Math.random() * 0.9 + 0.1) * 100) / 100;
  return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + opacity + ')';
};

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
        width: 40
      },
      paper: {
        width: 60
      },
      list: {
        color: 'rgba(255, 255, 255, 1)'
      }
    }
  };
  background.scroll.paper.height = background.height - background.scroll.wood.height * 2;
  background.scroll.paper.color = ctx.createLinearGradient(background.initialX, background.initialY, background.initialX + background.scroll.paper.width, background.initialY);
  background.scroll.paper.color.addColorStop(0, 'gray');
  background.scroll.paper.color.addColorStop(0.3, 'rgba(255, 255, 255, 1)');
  background.scroll.paper.color.addColorStop(0.35, 'rgba(255, 255, 255, 1)');
  background.scroll.paper.color.addColorStop(0.8, 'gray');
  background.scroll.paper.color.addColorStop(1, 'black');
  background.scroll.wood.offset = (background.scroll.paper.width - background.scroll.wood.width) / 2;
  background.scroll.wood.color = ctx.createLinearGradient(background.initialX + background.scroll.wood.offset, background.initialY, background.initialX + background.scroll.wood.offset + background.scroll.wood.width, background.initialY);
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
    initialY: background.initialY + background.scroll.wood.height + title.height,
    height: 150,
    textFont: '16px PT Mono',
    textColor: 'rgba(0, 0, 0, 1)',
    textLineHeight: 20,
    textOffsetX: 5,
    textOffsetY: 10,
    barWidth: 40,
    indent: 50,
    userBarColor: 'rgba(255, 0, 0, 1)'
  };
  histogram.initialX = background.initialX + background.scroll.paper.width + (background.width - background.scroll.paper.width - histogram.barWidth * names.length - histogram.indent * (names.length - 1)) / 2;
  histogram.stepY = histogram.height / getMaxNumber(times);
  histogram.stepX = histogram.barWidth + histogram.indent;
  histogram.drawBar = function (value, i) {
    ctx.font = histogram.textFont;
    ctx.fillStyle = histogram.textColor;
    ctx.fillText(Math.round(value).toString(10), histogram.initialX + histogram.stepX * i, histogram.initialY + histogram.textLineHeight + (histogram.height - value * histogram.stepY) - histogram.textOffsetY);
    ctx.fillStyle = names[i] === 'Вы' ? histogram.userBarColor : getRandomColor('0', '0', '255');
    ctx.fillRect(histogram.initialX + histogram.stepX * i, histogram.initialY + histogram.textLineHeight + (histogram.height - value * histogram.stepY), histogram.barWidth, value * histogram.stepY);
    ctx.fillStyle = histogram.textColor;
    ctx.font = histogram.textColor;
    ctx.fillText(names[i], histogram.initialX + histogram.stepX * i + histogram.textOffsetX, histogram.initialY + histogram.height + histogram.textLineHeight * 2);
  };

  ctx.fillStyle = background.shadowColor;
  ctx.fillRect(background.initialX + background.shadowOffset, background.initialY + background.scroll.wood.height + background.shadowOffset, background.width, background.scroll.paper.height);
  ctx.fillRect(background.initialX + background.scroll.wood.offset + background.shadowOffset, background.initialY + background.scroll.paper.height + background.scroll.wood.height + background.shadowOffset, background.scroll.wood.width, background.scroll.wood.height);

  ctx.fillStyle = background.scroll.wood.color;
  ctx.strokeRect(background.initialX + background.scroll.wood.offset, background.initialY, background.scroll.wood.width, background.scroll.wood.height);
  ctx.strokeRect(background.initialX + background.scroll.wood.offset, background.initialY + background.scroll.paper.height + background.scroll.wood.height, background.scroll.wood.width, background.scroll.wood.height);
  ctx.fillRect(background.initialX + background.scroll.wood.offset, background.initialY, background.scroll.wood.width, background.scroll.wood.height);
  ctx.fillRect(background.initialX + background.scroll.wood.offset, background.initialY + background.scroll.paper.height + background.scroll.wood.height, background.scroll.wood.width, background.scroll.wood.height);

  ctx.fillStyle = background.scroll.paper.color;
  ctx.strokeRect(background.initialX, background.initialY + background.scroll.wood.height, background.width, background.scroll.paper.height);
  ctx.fillRect(background.initialX, background.initialY + background.scroll.wood.height, background.scroll.paper.width, background.scroll.paper.height);

  ctx.fillStyle = background.scroll.list.color;
  ctx.fillRect(background.initialX + background.scroll.paper.width, background.initialY + background.scroll.wood.height, background.width - background.scroll.paper.width, background.scroll.paper.height);

  ctx.fillStyle = title.color;
  ctx.font = title.font;
  ctx.fillText(title.lineOneText, title.initialX + title.lineOneOffsetX, title.initialY + title.lineOneOffsetY);
  ctx.fillText(title.lineTwoText, title.initialX + title.lineTwoOffsetX, title.initialY + title.lineTwoOffsetY);

  times.forEach(histogram.drawBar);
};
