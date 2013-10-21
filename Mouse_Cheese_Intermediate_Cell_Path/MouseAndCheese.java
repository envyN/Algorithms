import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.util.Stack;

@SuppressWarnings("serial")
public class MouseAndCheese extends FileNotFoundException {
	private static int T, N;

	private static boolean tryReverseColoring = false;

	private static int A[][];

	public static void main(String[] args) throws FileNotFoundException {

		System.setIn(new FileInputStream("mouseAndCheese.txt"));
		Scanner sc = new Scanner(System.in);

		T = sc.nextInt();
		for (int i = 0; i < T; i++) {
			N = sc.nextInt();
			A = new int[N + 2][N + 2];
			for (int j = 0; j <= N + 1; j++) {
				for (int k = 0; k <= N + 1; k++) {
					A[j][k] = 1;
				}
			}
			for (int j = 1; j <= N; j++) {
				for (int k = 1; k <= N; k++) {
					A[j][k] = sc.nextInt();
				}
			}
			Algo(i);
		}
		sc.close();
	}

	private static void Algo(int tc) {
		// TODO Auto-generated method stub

		/*
		 * for (int i = 0; i < N + 2; i++) { for (int j = 0; j < N + 2; j++) { System.out.print(A[i][j] + " "); }
		 * System.out.println(); }
		 */
		System.out.println("---------------------------------------------------");
		System.out.println("---------------------------------------------------");
		System.out.println("Case# " + tc + " ");
		Stack<Integer> s1 = new Stack<Integer>();
		Stack<Integer> s2 = new Stack<Integer>();
		/*
		 * s1.push(1); s1.push(1); s2.push(N); s2.push(N);
		 */
		colorTopPath(1, 1, s1);
		if (!tryReverseColoring) {
			for (int i = 0; i < N + 2; i++) {
				for (int j = 0; j < N + 2; j++) {
					if (A[i][j] == 4)
						A[i][j] = 0;
				}
			}
			colorBotPath(N, N, s2);
			for (int i = 0; i < N + 2; i++) {
				for (int j = 0; j < N + 2; j++) {
					if (A[i][j] == 5)
						A[i][j] = 0;
					System.out.print(A[i][j] + " ");
				}
				System.out.println();
			}
		}
		else {
			System.out.println("Yayyy reversing coloring order");
			for (int i = 0; i < N + 2; i++) {
				for (int j = 0; j < N + 2; j++) {
					if (A[i][j] == 7)
						A[i][j] = 0;
					System.out.print(A[i][j] + " ");
				}
				System.out.println();
			}
			colorBotPath(N, N, s2);
			for (int i = 0; i < N + 2; i++) {
				for (int j = 0; j < N + 2; j++) {
					if (A[i][j] == 5)
						A[i][j] = 0;
				}
			}
			colorTopPath(1, 1, s1);
			for (int i = 0; i < N + 2; i++) {
				for (int j = 0; j < N + 2; j++) {
					if (A[i][j] == 4)
						A[i][j] = 0;
					System.out.print(A[i][j] + " ");
				}
				System.out.println();
			}
		}
		Stack<Integer> reverseS1 = new Stack<Integer>();
		while (!s1.isEmpty()) {
			reverseS1.push(s1.pop());
		}
		System.out.println();
		while (!reverseS1.isEmpty())
			System.out.print(reverseS1.pop() + " ");
		while (s2.size() > 1) {
			int s2j = s2.pop(), s2i = s2.pop();
			System.out.print(s2i + " "+s2j+" ");
		}
		System.out.println();
	}

	private static void colorTopPath(int i, int j, Stack<Integer> s1) {
		// System.out.println("trying to color : i=" + i + " ,j=" + j);

		if (i == N && j == N) {
			System.out.println("Oops not the end of matrix so soon!! :)");
			for (int i1 = 0; i1 < N + 2; i1++) {
				for (int j1 = 0; j1 < N + 2; j1++) {
					if (A[i1][j1] == 7)
						A[i][j] = 0;
				}
			}
			tryReverseColoring = true;
			return;
		}
		if (A[i - 1][j - 1] != 0 && A[i - 1][j] != 0 && A[i - 1][j + 1] != 0 && A[i][j - 1] != 0 && A[i][j + 1] != 0
				&& A[i + 1][j - 1] != 0 && A[i + 1][j] != 0 && A[i + 1][j + 1] != 0 && A[i - 1][j - 1] != 2
				&& A[i - 1][j] != 2 && A[i - 1][j + 1] != 2 && A[i][j - 1] != 2 && A[i][j + 1] != 2
				&& A[i + 1][j - 1] != 2 && A[i + 1][j] != 2 && A[i + 1][j + 1] != 2) {
			A[i][j] = 1;
			int y = s1.pop();
			int x = s1.pop();
			System.out.println("Decoloring!!!");
			colorTopPath(x, y, s1);
		}
		if (A[i - 1][j - 1] == 2 || A[i - 1][j] == 2 || A[i - 1][j + 1] == 2 || A[i][j - 1] == 2 || A[i][j + 1] == 2
				|| A[i + 1][j - 1] == 2 || A[i + 1][j] == 2 || A[i + 1][j + 1] == 2) {
			A[i][j] = 3;
			System.out.println("Reached EOP!!Now retracing path!!!");
			s1.push(i);
			s1.push(j);
			retraceOptimalTopPath(s1);
			return;
		}
		for (int r = -1; r < 2; r++) {
			for (int t = -1; t < 2; t++) {
				if (!(r == 0 && t == 0)) {
					if (A[i + r][j + t] == 0) {
						A[i][j] = 7;
						s1.push(i);
						s1.push(j);
						colorTopPath(i + r, j + t, s1);
						return;
					}
				}
			}
		}

	}

	private static void retraceOptimalTopPath(Stack<Integer> s1) {
		int j = s1.pop(), i = s1.pop(), prevY = s1.pop(), prevX = s1.pop();
		s1.push(prevX);
		s1.push(prevY);
		if (prevX == 1 && prevY == 1)
			return;
		for (int r = -1; r < 2; r++) {
			for (int t = -1; t < 2; t++) {
				if (!(r == 0 && t == 0) && !((i + r) == prevX && (j + t) == prevY)) {
					if (A[i + r][j + t] == 7) {
						int y = s1.pop();
						int x = s1.pop();
						while (!(y == (j + t) && x == (i + r))) {
							A[x][y] = 4;
							y = s1.pop();
							x = s1.pop();
						}
						s1.push(x);
						s1.push(y);
						if (x == 1 && y == 1)
							return;
						else
							retraceOptimalTopPath(s1);
						return;
					}
				}
			}
		}
		s1.push(i);
		s1.push(j);

	}

	private static void colorBotPath(int i, int j, Stack<Integer> s2) {
		// System.out.println("trying to color : i=" + i + " ,j=" + j);

		if (A[i - 1][j - 1] != 0 && A[i - 1][j] != 0 && A[i - 1][j + 1] != 0 && A[i][j - 1] != 0 && A[i][j + 1] != 0
				&& A[i + 1][j - 1] != 0 && A[i + 1][j] != 0 && A[i + 1][j + 1] != 0 && A[i - 1][j - 1] != 2
				&& A[i - 1][j] != 2 && A[i - 1][j + 1] != 2 && A[i][j - 1] != 2 && A[i][j + 1] != 2
				&& A[i + 1][j - 1] != 2 && A[i + 1][j] != 2 && A[i + 1][j + 1] != 2) {
			A[i][j] = 1;
			int y = s2.pop();
			int x = s2.pop();
			System.out.println("Decoloring!!!");
			colorBotPath(x, y, s2);
		}
		if (A[i - 1][j - 1] == 2 || A[i - 1][j] == 2 || A[i - 1][j + 1] == 2 || A[i][j - 1] == 2 || A[i][j + 1] == 2
				|| A[i + 1][j - 1] == 2 || A[i + 1][j] == 2 || A[i + 1][j + 1] == 2) {
			A[i][j] = 6;
			System.out.println("Reached EOP!!Now retracing path!!!");
			s2.push(i);
			s2.push(j);
			retraceOptimalBotPath(s2);
			return;
		}
		for (int r = 1; r > -2; r--) {

			for (int t = 1; t > -2; t--) {
				if (!(r == 0 && t == 0)) {
					if (A[i + r][j + t] == 0) {
						A[i][j] = 8;
						s2.push(i);
						s2.push(j);
						colorBotPath(i + r, j + t, s2);
						return;
					}
				}
			}
		}
	}

	private static void retraceOptimalBotPath(Stack<Integer> s2) {
		int j = s2.pop(), i = s2.pop(), prevY = s2.pop(), prevX = s2.pop();
		s2.push(prevX);
		s2.push(prevY);
		if (prevX == N && prevY == N)
			return;
		for (int r = 1; r > -2; r--) {
			for (int t = 1; t > -2; t--) {
				if (!(r == 0 && t == 0) && !((i + r) == prevX && (j + t) == prevY)) {
					if (A[i + r][j + t] == 8) {
						int y = s2.pop();
						int x = s2.pop();
						while (!(y == (j + t) && x == (i + r))) {
							A[x][y] = 5;
							y = s2.pop();
							x = s2.pop();
						}
						s2.push(x);
						s2.push(y);
						if (x == N && y == N)
							return;
						else
							retraceOptimalTopPath(s2);
						return;
					}
				}
			}
		}
		s2.push(i);
		s2.push(j);
	}
}
