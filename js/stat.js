'use strict';

window.renderStatistics = function (ctx, names, times) {
  var workingAreaPoints = [100, 10, 520, 280];
  (function renderBackground() {
    var initialX = workingAreaPoints[0];
    var initialY = workingAreaPoints[1];
    var backgroundHeight = workingAreaPoints[3] - workingAreaPoints[1];
    var backgroundWidth = workingAreaPoints[2] - workingAreaPoints[0];
    var shadowOffset = 10;
    var shadowColor = 'rgba(0, 0, 0, 0.7)';
    var scrollWoodHeight = 5;
    var scrollWoodWidth = 40;
    var scrollPaperHeight = backgroundHeight - scrollWoodHeight * 2;
    var scrollPaperWidth = 60;
    var listColor = 'rgba(255, 255, 255, 1)';
    var paperColor = ctx.createLinearGradient(initialX, initialY, initialX + scrollPaperWidth, initialY);
    paperColor.addColorStop(0, 'gray');
    paperColor.addColorStop(0.3, 'rgba(255, 255, 255, 1)');
    paperColor.addColorStop(0.35, 'rgba(255, 255, 255, 1)');
    paperColor.addColorStop(0.8, 'gray');
    paperColor.addColorStop(1, 'black');
    var woodColor = ctx.createLinearGradient((initialX + (scrollPaperWidth - scrollWoodWidth) / 2), initialY, (initialX + scrollWoodWidth + (scrollPaperWidth - scrollWoodWidth) / 2), initialY);
    woodColor.addColorStop(0, 'rgba(77, 31, 6, 1)');
    woodColor.addColorStop(0.35, 'rgba(140, 52, 19, 1)');
    woodColor.addColorStop(0.4, 'rgba(140, 52, 19, 1)');
    woodColor.addColorStop(1, 'rgba(77, 31, 6, 1)');
    workingAreaPoints = [(initialX + scrollPaperWidth), (initialY + scrollWoodHeight), (initialX + backgroundWidth), (initialY + backgroundHeight)];

    ctx.fillStyle = shadowColor;
    ctx.fillRect((initialX + shadowOffset), (initialY + scrollWoodHeight + shadowOffset), backgroundWidth, scrollPaperHeight);
    ctx.fillRect((initialX + (scrollPaperWidth - scrollWoodWidth) / 2 + shadowOffset), (initialY + scrollPaperHeight + scrollWoodHeight + shadowOffset), scrollWoodWidth, scrollWoodHeight);

    ctx.fillStyle = woodColor;
    ctx.strokeRect((initialX + (scrollPaperWidth - scrollWoodWidth) / 2), initialY, scrollWoodWidth, scrollWoodHeight);
    ctx.strokeRect((initialX + (scrollPaperWidth - scrollWoodWidth) / 2), (initialY + scrollPaperHeight + scrollWoodHeight), scrollWoodWidth, scrollWoodHeight);
    ctx.fillRect((initialX + (scrollPaperWidth - scrollWoodWidth) / 2), initialY, scrollWoodWidth, scrollWoodHeight);
    ctx.fillRect((initialX + (scrollPaperWidth - scrollWoodWidth) / 2), (initialY + scrollPaperHeight + scrollWoodHeight), scrollWoodWidth, scrollWoodHeight);

    ctx.fillStyle = paperColor;
    ctx.strokeRect(initialX, (initialY + scrollWoodHeight), backgroundWidth, scrollPaperHeight);
    ctx.fillRect(initialX, (initialY + scrollWoodHeight), scrollPaperWidth, scrollPaperHeight);
    ctx.fillStyle = listColor;
    ctx.fillRect(initialX + scrollPaperWidth, (initialY + scrollWoodHeight), backgroundWidth - scrollPaperWidth, scrollPaperHeight);
  })();
  (function renderTitle() {
    var initialX = workingAreaPoints[0];
    var initialY = workingAreaPoints[1];

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', initialX + 110, initialY + 20);
    ctx.fillText('Список результатов:', initialX + 90, initialY + 44);

    workingAreaPoints[1] += 60;
  })();
  (function renderHistogram() {
    var histogramHeight = 150;
    var maxTime = Math.round(times.slice().sort(function (a, b) {
      return a - b;
    })[times.length - 1]);
    var step = histogramHeight / maxTime;
    var barWidth = 40;
    var indent = 50;
    var lineHeight = 20;
    var initialX = (workingAreaPoints[2] - workingAreaPoints[0] - (barWidth * names.length + indent * (names.length - 1))) / 2 + workingAreaPoints[0];
    var initialY = workingAreaPoints[1];

    for (var i = 0; i < times.length; i++) {
      ctx.font = '14px PT Mono';
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillText(Math.round(times[i]), initialX + (indent + barWidth) * i + 5, initialY + lineHeight + (150 - times[i] * step) - 10);
      ctx.fillStyle = names[i] === 'Вы' ? 'rgba(0, 0, 255, 1)' : 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';
      ctx.fillRect(initialX + (indent + barWidth) * i, initialY + lineHeight + (150 - times[i] * step), barWidth, times[i] * step);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.font = '16px PT Mono';
      ctx.fillText(names[i], initialX + (indent + barWidth) * i + 5, initialY + histogramHeight + lineHeight * 2);
    }
  })();
};

