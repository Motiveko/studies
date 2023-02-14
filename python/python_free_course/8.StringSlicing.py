# ============
# ? string slicieng
# ? slice(stop)
# ? slice(start, stop, step)
# ============

# String slicing
String = 'ASTRING'

# Using slice constructor
s1 = slice(3)
s2 = slice(1, 5, 2)
s3 = slice(-1, -12, -2)
 
print('================')
print(slice(3)) # AST
print(slice(1, 5, 2)) # SR
print(slice(-1, -12, -2)) # GITA
print('================')


# ? arr[start:stop] => range
# ? arr[start:] => start 부터 끝까지
# ? arr[:stop] => 처음부터 stop까지
# ? arr[:]  => 전체 copy
# ? arr[start:stop:step] => step..

String = 'GEEKSFORGEEKS'

print('================')
print(String[1:5:2]) # EK
print(String[-1:-12:-2]) # SEGOSE
print(String[::-1]) # SKEEGROFSKEEG => 거꾸로!

