
# ============
# ? c에서 표준으로 정의된 math 함수를 제공한다
# ? https://docs.python.org/ko/3/library/math.html
# ? js기본 math 함수보다 특이한게 월등히 많다.
# ============
import math

pi = 3.14
x = 1
y = 2
z = 3

# 최대공약수
print('최대공약수(30,20) : {}'.format(math.gcd(30, 20))) # 10

# 두 값이 가까운지.. 3,4번째 인자 뭔지 정확하게 모르겠다
print(math.isclose(-1, 122200, rel_tol=1.1, abs_tol=0.0))

print('최소공배수(3, 5) : {}'.format(math.lcm(3, 5)))

# 기타등등.. 확률과 통계 부동소수점 등이 있다..