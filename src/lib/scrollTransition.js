const scrollTransition = (transitionLength = 1, startPosition = 0, endPosition, scrollY) => {

    let multiplier = transitionLength / (endPosition - startPosition);
    let transitionScrollPosition = Math.min(endPosition, Math.max(startPosition, scrollY));

    return (transitionScrollPosition - startPosition) * multiplier;

}

export default scrollTransition;